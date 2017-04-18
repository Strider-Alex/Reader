import React, { Component } from 'react';
import {DeviceEventEmitter,Text,View,Button,Platform,PermissionsAndroid, ScrollView } from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFetchBlob from 'react-native-fetch-blob';
const Sound = require('react-native-sound');
let music; // Sound instance
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const docDir = dirs.DocumentDir+'/docs';
const audioDir = dirs.DocumentDir+'/audio';
//console.log(AudioUtils.DocumentDirectoryPath);

export default class CreateNewAudio extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            //currentTime: 0.0,
            //recording: false,
            //stoppedRecording: false,
            //finished: false,
            docContent: undefined,
            audioPath: AudioUtils.DocumentDirectoryPath + 'audio/test.aac',
            hasPermission: undefined,
        };
    }
    _prepareRecordingPath(audioPath){
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        AudioEncodingBitRate: 32000
      });
    }
    _reloadDocContent(doc){
        if(doc){
            fs.readFile(`${docDir}/${doc}`,'uft8')
                .then((data)=>{
                    console.log(data);
                    this.setState({
                        docContent: JSON.parse(data).content
                    })
                })
                .catch((err)=>{
                    console.log("the error:"+err);
                });
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('docChanged',(doc)=>this._reloadDocContent(doc));
        // get permission
        this._checkPermission().then((hasPermission) => {
                this.setState({ hasPermission });

                if (!hasPermission) return;
        });
        // make audio directory
        if(!(fs.isDir(audioDir))){
            // if audio path doesn't exist, mkdir
            fs.mkdir(audioDir);
        }
        // get text content
        this._reloadDocContent(this.props.doc);
    }
    componentWillUnMount(){
         this.subscription.remove();
    }
     _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
            console.log('Permission result:', result);
            return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
    }
    _onPressRecordStart(){
        this._prepareRecordingPath(this.state.audioPath);
        AudioRecorder.startRecording().catch((err)=>{
            if(err) console.log(err);
        })
    }
    _onPressRecordStop(){
        return AudioRecorder.stopRecording().catch((err)=>{
            if(err) console.log(err);
        })
    }
    // play or resume a muisc, release when it's done
    _playSound(music){
         music.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                music.release();
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        })
    }
    // on press, play music
    _onPressPlayStart(){
        if(music!==undefined&&music.isLoaded()){
            this._playSound(music);
        }
        else{ //load song if it's not loaded
            music = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } 
                // loaded successfully
                console.log('duration in seconds: ' + music.getDuration() + 'number of channels: ' + music.getNumberOfChannels());
                // Play the sound with an onEnd callback
                this._playSound(music);
            });
        }
    }
    // on press, stop music
    _onPressPlayStop(){
        music.stop();
        music.release();
        music=undefined;
    }
    // go docList
    _goToDocList(){
        this.props.navigator.push(this.props.routes[3]);
    }
    // go to musicList
    _goToMusicList(){
        this.props.navigator.push(this.props.routes[4]);
    }
    render() {
        return (
            /* jshint ignore: start */
            <View style={{flex:1}}>
                <Text>Doc:{(()=>{
                    if(this.props.doc){
                        return this.props.doc.split(".")[0];
                    }else{
                        return "No doc selected"
                    }
                })()}</Text>
                <Button title="Select Doc!" onPress={()=>this._goToDocList()}/>
                <Text>Music:{(()=>{
                    if(this.props.music){
                        return this.props.music.split(".")[0];
                    }else{
                        return "No music selected"
                    }
                })()}</Text>
                <Button title="Select Music" onPress={()=>this._goToMusicList()}/>
                <Button title="Start Recording!" onPress={()=>this._onPressRecordStart()}/>
                <Button title="Finish Recording!" onPress={()=>this._onPressRecordStop()}/>
                <Button title="Start Playing!" onPress={()=>this._onPressPlayStart()}/>
                <Button title="Finish Playing!" onPress={()=>this._onPressPlayStop()}/> 
                <ScrollView>
                    <Text>{this.state.docContent}</Text>
                </ScrollView> 
            </View>
            /* jshint ignore: end */
        );
    }
}