import React, { Component } from 'react';
import {Button, Body,Container, Content, Card, CardItem, Text, Textarea, Icon, Input, InputGroup,Spinner,Toast } from 'native-base';
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
        let audio = this.state.audioList[i];
        this.setState({
            downloading:i
        });
        console.log(`${apiUrl}/reader/audio/download?_id=${audio._id}`);
        RNFetchBlob
            .config({
             // response data will be saved to this path if it has access right.
                path :`${otherDir}/${audio._id}.aac`
            })
            .fetch('GET',`${apiUrl}/reader/audio/download?_id=${audio._id}`)
            .then((res)=>{
                //store json file
                return fs.writeFile(
                    `${otherDir}/json/${audio._id}.json`,
                    JSON.stringify(audio),
                    'utf8'
                );
            })
            .then(()=>{
                this.setState({
                    downloading:-1
                });
                // show toast messages: download succeed!
                Toast.show({
                    text: '作品已添加至我的收藏',
                    position: 'bottom',
                    buttonText: '好'
                });
            })
            .catch((err)=>{
                console.log(err);
                this.setState({
                    downloading:-1
                });
            });
    }
    
    render(){    
        return(
            /*jshint ignore:start*/
            <Container style={{marginVertical:60}}>
                <AudioDownloadView data={this.state.audioList} downloading={this.state.downloading}
                    downloadClick={(file,i)=>this._onDownloadClick(file,i)}
                 />
            </Container>
            /*jshint ignore:end*/
        );     
    }
}