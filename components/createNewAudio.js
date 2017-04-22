import React, { Component } from 'react';
import {DeviceEventEmitter,View,Platform,PermissionsAndroid, ScrollView,Keyboard } from 'react-native';
import {Button, Container, Content,Right,Text, Icon, Input,InputGroup,Card,CardItem,Body } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import MusicPlayer from './musicPlayer';
import AudioRecorder from './audioRecorder';
let player = new MusicPlayer();
let recorder = new AudioRecorder();
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const docDir = dirs.DocumentDir+'/docs';
const musicDir = dirs.DocumentDir+'/music';
const audioDir = dirs.DocumentDir+'/audio';

export default class CreateNewAudio extends Component {
    
    constructor(props){
        super(props);
        this.state = {
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
    _reloadDocContent(doc){
        if(doc){
            fs.readFile(`${docDir}/${doc}`,'uft8')
                .then((data)=>{
                    this.setState({
                        docContent: JSON.parse(data).content
                    });
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
            });
            this._reloadDocContent(doc);
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
    //on click, start or stop record
    _recordOnClick(){
        recorder.recordStartAndStop(`${audioDir}/${this.state.audio}.aac`,this.state.recording,(recording)=>{
            this.setState({
                recording:recording
            });
        });
        //also play music
        player.musicPlayAndStop(`${musicDir}/${this.state.music}`);
    }
    //on click, play or stop music
    _musicOnClick(){
        player.musicPlayAndStop(`${musicDir}/${this.state.music}`,(playing)=>{
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
            <Container style={{paddingVertical:55,marginHorizontal:15}}>
            
                <InputGroup borderType='underline'>
                    <Icon name="md-home" />
                    <Input   onChangeText={(audio)=>this.setState({audio:audio})} value={this.state.audio} placeholder={"作品名称"}/>
                </InputGroup>
                <InputGroup>
                    <Icon name="md-book" />
                    <Input onFocus={()=>{Keyboard.dismiss();this._goToDocList();}} value={this.state.doc?this.state.doc.split(".")[0]:""} placeholder={"文本文件"}/>
                </InputGroup>
                <InputGroup>
                    <Icon  name="md-headset" />
                    <Input onFocus={()=>{Keyboard.dismiss();this._goToMusicList();}} value={this.state.music?this.state.music.split(".")[0]:""} placeholder={"伴奏文件"}/>
                    {(()=>{
                        if(this.state.music){
                            return <Icon onPress={()=>this._musicOnClick()} name={this.state.musicPlaying?"md-pause":"md-play"}/>
                        }
                    })()}
                </InputGroup>
                    <Card style={{marginTop:20}}>
                        <CardItem header style={{backgroundColor:"#EFEFF2"}}>
                            <Icon name="md-document" style={{color:"#007AFF"}}/>
                            <Text style={{color:"#585858"}}>文本内容</Text>
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
                <Button block style={{marginHorizontal:50,marginVertical:15}} onPress={()=>this._recordOnClick()}>
                    <Text>{this.state.recording?"完成创作":"开始创作！"}</Text>
                </Button>
            </Container>
            /* jshint ignore: end */
        );
    }
}