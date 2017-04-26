import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import {Button, Body,Container, Content, Card, CardItem, Text, Textarea, Icon, Input, InputGroup } from 'native-base';
import AudioListView from './audioListView';
import MusicPlayer from './musicPlayer';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const otherDir = dirs.DocumentDir+'/other'; //save other people's audio
let player = new MusicPlayer();
export default class Collection extends Component {
    constructor(props){
        super(props);
        this.state={
            audioList:[],
            playing:-1 //-1: no music is playing
        };
    }
    _onPlayClick(file,i){
        player.musicPlayAndStop(`${otherDir}/${this.state.audioList[i]._id}.aac`,(playing)=>{
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


    componentDidMount(){
        
        fs.ls(`${otherDir}/json`)
            .then((files)=>{
                console.log(files);
                let tasks=[];
                for(let file of files){
                    tasks.push(fs.readFile(`${otherDir}/json/${file}`,'uft8'));
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
                fs.mkdir(`${otherDir}/json`);
            });
    }
    render() {
        return (
            /* jshint ignore: start */
            <Container>
                {(this.state.audioList.length)?
                <Container style={{marginVertical:60}}>
                    <AudioListView share={false} data={this.state.audioList} playing={this.state.playing}
                        playClick={(file,i)=>this._onPlayClick(file,i)} />
                </Container>
                :<Container style={{marginTop:100}}><Text note style={{fontSize:14,padding:20}}>啊噢，您似乎还没有收藏，立刻去“分享”下载吧~</Text></Container>
                }
            </Container>
            /* jshint ignore: end */
        );
    }
}