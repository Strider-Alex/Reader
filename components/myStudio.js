import React, { Component } from 'react';
import { Footer, FooterTab, Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import ClickableListView from './clickableListView';
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
            audioList:[],
            playing:-1 //-1: no music is playing
        };
    }
    _onClick(file,i){
        player.musicPlayAndStop(`${audioDir}/${file}`,(playing)=>{
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
        fs.ls(audioDir)
            .then((files)=>{
                console.log(files);
                this.setState({
                    audioList:files
                });
            })
            .catch((err)=>{
                console.log(err);
                // create directory if not exist 
                fs.mkdir(audioDir);
            });
    }
    render() {
        return (
            /* jshint ignore: start */
            <Container style={{marginTop:100}}>
                <ClickableListView data={this.state.audioList} active={this.state.playing} activeIconName={"md-pause"} iconName={"md-play"} 
                    click={(file,i)=>this._onClick(file,i)}/>
            </Container>
            /* jshint ignore: end */
        );
    }
}