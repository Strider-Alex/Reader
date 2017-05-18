import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard } from 'react-native';
import {Button, Container, Content,Text, Icon, Input,InputGroup,Card,CardItem,Body, Toast } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import MusicPlayer from './musicPlayer';
import AudioRecorder from './audioRecorder';
let player = new MusicPlayer();
let recorder = new AudioRecorder();
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const docDir = dirs.DocumentDir+'/docs';
const musicDir = '';
const audioDir = dirs.DocumentDir+'/audio';
const Realm = require('realm');
import Audio from '../models/audio';
import Doc from '../models/doc';
import ID from '../models/id';
let realm = new Realm({
    schema:[Audio,Doc,ID]
});

export default class CreateNewAudio extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            audio:null,
            doc: null,
            music: null,
            hasPermission: undefined,
            // if the music is playing now
            musicPlaying:false,
            // if the audio is recording now
            recording:false
        };
    }
    componentWillMount() {
        //listen to doc change event
        //reload doc content
        DeviceEventEmitter.addListener('docChanged',(doc)=>{
            this.setState({
                doc:doc
            });
        });
        //listen to music change event
        DeviceEventEmitter.addListener('musicChanged',(music)=>{
            this.setState({
                music:music
            });
        });
        // get permission of microphone
        this._checkPermission().then((hasPermission) => {
                this.setState({ hasPermission });

                if (!hasPermission) return;
        });
        // make audio directory
        if(!(fs.isDir(audioDir))){
            // if audio path doesn't exist, mkdir
            fs.mkdir(audioDir);
        }

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
    //on click, start or stop record
    _recordOnClick(){
        if(this.state.audio&&this.state.music&&this.state.doc){
            recorder.recordStartAndStop(`${audioDir}/${this.state.audio}.aac`,this.state.recording,(recording)=>{
                this.setState({
                    recording:recording
                });
                //if recording stop,write json file
                if(!recording){
                    let data = {};
                    data.doc = this.state.docData;
                    data.title = this.state.audio;
                    fs.writeFile(
                        audioDir+`/json/${this.state.audio}.json`,
                        JSON.stringify(data),
                        'utf8'
                    )
                    
                    .then(()=>{
                        // show toast messages: record succeed!
                        Toast.show({
                            text: '作品已添加至工作室',
                            position: 'bottom',
                            buttonText: '好'
                        });
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }
            });
            //also play/stop music
            player.musicPlayAndStop(`${this.state.music}`);
        }
        
    }
    //on click, play or stop music
    _musicOnClick(){
        player.musicPlayAndStop(`${this.state.music}`,(playing)=>{
            this.setState({
                musicPlaying:playing
            });
        });
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
            <Container style={styles.container}>
            
                <InputGroup borderType='underline'>
                    <Icon style={styles.icon} name="md-home" />
                    <Input  maxLength={20} style={styles.input} onChangeText={(audio)=>this.setState({audio:audio})} value={this.state.audio} placeholder={"作品名称"} placeholderTextColor={styles.lightGreen}/>
                </InputGroup>
                <InputGroup>
                    <Icon style={styles.icon} name="md-book" />
                    <Input  style={styles.input} onFocus={()=>{Keyboard.dismiss();this._goToDocList();}} value={this.state.doc?this.state.doc.title.split(".")[0]:""} placeholder={"文本文件"} placeholderTextColor={styles.lightGreen}/>
                </InputGroup>
                <InputGroup>
                    <Icon style={styles.icon}  name="md-headset" />
                    <Input  style={styles.input} onFocus={()=>{Keyboard.dismiss();this._goToMusicList();}} value={this.state.music?this.state.music.split(".")[0]:""} placeholder={"伴奏文件"} placeholderTextColor={styles.lightGreen}/>
                    {(()=>{
                        if(this.state.music){
                            return <Icon onPress={()=>this._musicOnClick()} name={this.state.musicPlaying?"md-pause":"md-play"}/>
                        }
                    })()}
                </InputGroup>
                {this.state.doc?(
                        <Content style={{marginTop:20}}>

                                <Text style={{color:"#585858"}}>
                                    {this.state.doc.content}
                                </Text>
                        </Content>
                ):null
                }
                <Button rounded block style={styles.recordButton} onPress={()=>this._recordOnClick()}>
                    <Text>{this.state.recording?"完成创作":"开始创作！"}</Text>
                </Button>
            </Container>
            /* jshint ignore: end */
        );
    }
}
const styles={
    container:{
        marginTop:55,
        marginBottom:30,
        marginHorizontal:15
    },
    icon:{
        color:'#FF4081'
    },
    input:{
        color:'#008975'
    },
    recordButton:{
        marginHorizontal:50,
        marginVertical:15,
        backgroundColor:'#FF80AB'
    },
    lightGreen:'#00BF9A'
};