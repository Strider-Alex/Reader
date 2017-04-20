import React, { Component } from 'react';
import { View,ListView,DeviceEventEmitter} from 'react-native';
import {Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const Sound = require('react-native-sound');
const musicDir = dirs.DocumentDir+'/music';
const apiUrl = 'http://api.strider.site';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class MusicList extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            musicList:[]
        };
        
    }

    componentDidMount() {
        // get music list from the file system
        fs.ls(musicDir)
            .then((files)=>{
                this.setState({
                    musicList:files
                });
            })
            .catch((err)=>{
                // if file doesn't exist, mkdir
                fs.mkdir(musicDir);
            });
    }
    _onMusicSelected(music){
        if(music){
            // emit event for createNewAudio view
            DeviceEventEmitter.emit("musicChanged",music);
            // go back
            Actions.pop();
        }
    }
    
    render() {
        return (
            /* jshint ignore: start */
            <Container style={{marginTop:100}}>
                <Content>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.musicList)}
                        renderRow={(rowData) => <Button block onPress={()=>this._onMusicSelected(rowData)}><Text>{rowData.split(".")[0]}</Text></Button>}
                        enableEmptySections={true}
                    />
                </Content>
            </Container>
            /* jshint ignore: end */
        );
    }
}