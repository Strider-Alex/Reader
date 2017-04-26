import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import {Button, Body,Container, Content, Card, CardItem, Text, Textarea, Icon, Input, InputGroup,Spinner } from 'native-base';
import AudioListView from './audioListView';
import MusicPlayer from './musicPlayer';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const audioDir = dirs.DocumentDir+'/audio';
const apiUrl = 'http://api.strider.site';
let player = new MusicPlayer();
export default class MyStudio extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            nickname:undefined,
            comment:undefined,
            selected:-1, //-1: no audio is selected
            audioList:[],
            uploading:false, //if the app is uploading
            playing:-1 //-1: no music is playing
        };
    }
    //did mount, load my work from storage
     componentDidMount(){   
        fs.ls(`${audioDir}/json`)
            .then((files)=>{
                console.log(files);
                let tasks=[];
                for(let file of files){
                    tasks.push(fs.readFile(`${audioDir}/json/${file}`,'uft8'));
                }
                return Promise.all(tasks);
            })
            .then((dataSet)=>{
                audioList=[];
                for(let data of dataSet){
                    audioList.push(JSON.parse(data));
                }
                this.setState({
                    audioList:audioList
                });
            })
            .catch((err)=>{
                console.log(err);
                // create directory if not exist 
                fs.mkdir(`${audioDir}/json`);
            });
    }
    //on click, play or stop audio
    _onPlayClick(file,i){
        player.musicPlayAndStop(`${audioDir}/${file}.aac`,(playing)=>{
            if(playing){
                this.setState({
                    playing:i
                });
            }
            else{
                this.setState({
                    playing:-1
                });
            }
        });
    }
    //on click, show modal
    _onShareClick(file,i){
        this.setState({
            selected:i,
            modalVisible:true
        });
    }
    //on modal button click, upload audio data to server
    //data: {audio:AUDIO_FILE,data:AUDIO_INFO}
    _shareToClound(){
        let audioInfo = this.state.audioList[this.state.selected];
        audioInfo.author = this.state.nickname;
        audioInfo.comment = this.state.comment;
        console.log(audioInfo);
        this.setState({
            uploading:true
        });
        RNFetchBlob.fetch('POST', `${apiUrl}/reader/audio/upload`, {
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'audio', filename : `${audioInfo.title}.aac`, data: RNFetchBlob.wrap(`${audioDir}/${audioInfo.title}.aac`)},
            { name : 'data', data : JSON.stringify(audioInfo)}
        ])
            .then(()=>{
                this.setState({
                    uploading:false,
                    modalVisible:false
                });
            })
            .catch((err)=>{
                this.setState({
                    uploading:false,
                });
                console.log(err);
            });      
    }
    render() {
        return (
            /* jshint ignore: start */
            <Container>
                {(this.state.audioList.length)?
                (
                <Container style={{marginVertical:60}}>
                    <Modal onClosed={()=>this.setState({modalVisible:false})} isOpen={this.state.modalVisible} position="center" style={{padding:20,height:400,width:300,borderRadius:10}}>
                        <Container>
                            <Content>
                                    <Text>将作品和大家分享</Text>
                                    <InputGroup borderType='regular'>
                                        <Icon name="md-person" />
                                        <Input  maxLength={20} onChangeText={(nickname)=>this.setState({nickname:nickname})} value={this.state.nickname} placeholder={"您的昵称"}/>
                                    </InputGroup>
                                    <InputGroup borderType='regular'>
                                        <Textarea   style={{height:200,width:200}} onChangeText={(comment)=>this.setState({comment:comment})} value={this.state.comment} placeholder={"您的评论"}/>
                                    </InputGroup>
                                    <Button block onPress={()=>this._shareToClound()}>
                                        {(this.state.uploading)?<Spinner/>:<Text>现在分享！</Text>}
                                    </Button>
                            </Content>
                        </Container>
                    </Modal>
                    {(this.state.modalVisible)?undefined:(
                        <Container>
                            <AudioListView share={true} data={this.state.audioList} playing={this.state.playing}
                                playClick={(file,i)=>this._onPlayClick(file,i)}
                                shareClick={(file,i)=>this._onShareClick(file,i)} />
                        </Container>
                    )}
                </Container>
                )
                :<Container style={{marginTop:100}}><Text note style={{fontSize:14,padding:20}}>啊噢，您似乎还没有作品，立刻去“新的作品”创造属于您的佳作吧~</Text></Container>
                }
            </Container>
            
            /* jshint ignore: end */
        );
    }
}