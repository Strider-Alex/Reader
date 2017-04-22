import React, { Component } from 'react';
import {DeviceEventEmitter,View,Platform,PermissionsAndroid, ScrollView,Keyboard } from 'react-native';
import {Button, Container, Content,Right,Text, Icon, Input,InputGroup,Card,CardItem,Body } from 'native-base';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const Sound = require('react-native-sound');
let musicObj; // Sound instance
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const docDir = dirs.DocumentDir+'/docs';
const musicDir = dirs.DocumentDir+'/music';
const audioDir = dirs.DocumentDir+'/audio';

export default class CreateNewAudio extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            //currentTime: 0.0,
            //recording: false,
            //stoppedRecording: false,
            //finished: false,
            audio:undefined,
            doc: undefined,
            music: undefined,
            docContent: undefined,
            hasPermission: undefined,
            // if the music is playing now
            musicPlaying:false,
            // if the audio is recording now
            recording:false
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
        //listen to doc change event
        //reload doc content
        DeviceEventEmitter.addListener('docChanged',(doc)=>{
            this.setState({
                doc:doc
            })
            this._reloadDocContent(doc);
        });
        //listen to music change event
        DeviceEventEmitter.addListener('musicChanged',(music)=>{
            this.setState({
                music:music
            });
        });
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
        this._reloadDocContent(this.state.doc);
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
    _recordStartAndStop(path){
        //stop recording
        if(this.state.recording){
            AudioRecorder.stopRecording()
                .then(()=>{
                    //change state
                    this.setState({
                        recording:false
                    });
                })
                .catch((err)=>{
                    if(err) console.log(err);
                });
        }
        else{
            this._prepareRecordingPath(path);
            AudioRecorder.startRecording()
                .then(()=>{
                    //change state
                    this.setState({
                        recording:true
                    });
                })
                .catch((err)=>{
                    if(err) console.log(err);
                });
        }
    }
    // the core function to play or resume a muisc, release when it's done
    _playSound(musicObj){
         musicObj.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                musicObj.release();
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        })
    }
    // play/stop music/audio
    _musicPlayAndStop(path){
        if(musicObj!==undefined&&musicObj.isLoaded()){
            musicObj.stop();
            musicObj.release();
            musicObj=undefined;
            this.setState({
                musicPlaying:false
            })
        }
        else{ //load song if it's not loaded
            musicObj = new Sound(path, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } 
                // loaded successfully
                console.log('duration in seconds: ' + musicObj.getDuration() + 'number of channels: ' + musicObj.getNumberOfChannels());
                // Play the sound with an onEnd callback
                this._playSound(musicObj);
                this.setState({
                    musicPlaying:true
                });
            });
        }
    }
    // go docList
    _goToDocList(){
        Actions.docList();
    }
    // go to musicList
    _goToMusicList(){
        Actions.musicList();
    }
    render() {
        return (
            /* jshint ignore: start */
            <Container style={{paddingVertical:55,marginHorizontal:15}}>
            
                <InputGroup borderType='underline'>
                    <Icon name="md-home" />
                    <Input   onChangeText={(audio)=>this.setState({audio:audio})} value={this.state.audio} placeholder={"Audio File Name"}/>
                </InputGroup>
                <InputGroup>
                    <Icon name="md-book" />
                    <Input onFocus={()=>{Keyboard.dismiss();this._goToDocList();}} value={this.state.doc?this.state.doc.split(".")[0]:""} placeholder={"Select Doc"}/>
                </InputGroup>
                <InputGroup>
                    <Icon  name="md-headset" />
                    <Input onFocus={()=>{Keyboard.dismiss();this._goToMusicList();}} value={this.state.music?this.state.music.split(".")[0]:""} placeholder={"Select Music"}/>
                    {(()=>{
                        if(this.state.music){
                            return <Icon onPress={()=>this._musicPlayAndStop(`${musicDir}/${this.state.music}`)} name={this.state.musicPlaying?"md-pause":"md-play"}/>
                        }
                    })()}
                </InputGroup>
                
                
                    <Card style={{marginTop:20}}>
                        <CardItem header style={{backgroundColor:"#EFEFF2"}}>
                            <Icon name="md-document" style={{color:"#007AFF"}}/>
                            <Text style={{color:"#585858"}}>Text</Text>
                        </CardItem>
                        <Content>
                        <CardItem >
                            <Body>
                                <Text style={{color:"#585858"}}>
                                    {this.state.docContent}
                                </Text>
                            </Body>
                        </CardItem>
                        </Content>
                    </Card>
                <Button block style={{marginHorizontal:50,marginVertical:15}} onPress={()=>{this._recordStartAndStop(`${audioDir}/${this.state.audio}.aac`);this._musicPlayAndStop(`${musicDir}/${this.state.music}`)}}>
                    <Text>{this.state.recording?"Stop Recording":"Start Recording Now!"}</Text>
                </Button>
            </Container>
            /* jshint ignore: end */
        );
    }
}