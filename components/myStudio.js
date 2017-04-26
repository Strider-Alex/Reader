import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import {Button, Body,Container, Content, Card, CardItem, Text, Textarea, Icon, Input, InputGroup } from 'native-base';
import AudioListView from './audioListView';
import MusicPlayer from './musicPlayer';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const audioDir = dirs.DocumentDir+'/audio';
let player = new MusicPlayer();
export default class MyStudio extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:true,
            nickname:undefined,
            comment:undefined,
            selected:-1, //-1: no audio is selected
            audioList:[],
            playing:-1 //-1: no music is playing
        };
    }
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
    _onShareClick(file,i){
        this.setState({
            selected:i,
            modalVisible:true
        });
    }
    _shareToClound(){
        let audioInfo = this.state.audioList[i];
        audioInfo.author = this.state.nickname;
        audioInfo.comment = this.state.comment;
        console.log(audioInfo);
    }
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
                console.log(audioList);
            })
            .catch((err)=>{
                console.log(err);
                // create directory if not exist 
                fs.mkdir(`${audioDir}/json`);
            });
    }
    render() {
        return (
            /* jshint ignore: start */
            <Container>
            <Modal isOpen={this.state.modalVisible} position="center" style={{height:400,width:300,borderRadius:10}}>
                    <Container>
                        <Content>
                            <Body>
                                <Text>将作品和大家分享</Text>
                                <InputGroup borderType='underline'>
                                    <Icon name="md-person" />
                                    <Input  maxLength={20} onChangeText={(nickname)=>this.setState({nickname:nickname})} value={this.state.nickname} placeholder={"您的昵称"}/>
                                </InputGroup>
                                <InputGroup borderType='underline'>
                                    <Icon name="md-person" />
                                    <Textarea  maxLength={200} style={{height:100}}onChangeText={(comment)=>this.setState({comment:comment})} value={this.state.comment} placeholder={"您的评论"}/>
                                </InputGroup>
                                <Button onPress={()=>this.setState({modalVisible:false})}>
                                    <Text>现在分享！</Text>
                                </Button>
                            </Body>
                        </Content>
                    </Container>
                </Modal>
                {(this.state.modalVisible)?undefined:(
            <Container style={{marginTop:100}}>
                <AudioListView data={this.state.audioList} playing={this.state.playing}
                    onClosed={()=>this.setState({modalVisible:false})} 
                    playClick={(file,i)=>this._onPlayClick(file,i)}
                    shareClick={(file,i)=>this._onShareClick(file,i)}
                    upload={true} />
            </Container>
                )}
            </Container>
            /* jshint ignore: end */
        );
    }
}