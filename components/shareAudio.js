import React, { Component } from 'react';
import {Button, Body,Container, Content, Card, CardItem, Text, Textarea, Icon, Input, InputGroup,Spinner } from 'native-base';
import AudioDownloadView from './audioDownloadView';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const otherDir = dirs.DocumentDir+'/other';
const apiUrl = 'http://api.strider.site';
export default class ShareAudio extends Component {
    constructor(props){
        super(props);
        this.state={
            audioList:[],
            downloading:-1
        };
    }
    //did mount, get audio data from api
    componentDidMount(){
         RNFetchBlob
            .fetch('GET',apiUrl+'/reader/audio')
            .then((res)=>{
                const data = res.json().data;
                this.setState({
                    audioList:data
                });
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    // on click, download audio from api, store json file
    _onDownloadClick(file,i){
        this.setState({
            downloading:i
        });
    }
    
    render(){    
        return(
            /*jshint ignore:start*/
            <Container style={{marginTop:100}}>
                <AudioDownloadView data={this.state.audioList} downloading={this.state.downloading}
                    downloadClick={(file,i)=>this._onDownloadClick(file,i)}
                 />
            </Container>
            /*jshint ignore:end*/
        );     
    }
}