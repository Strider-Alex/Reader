import React, { Component } from 'react';
import { View,ListView,DeviceEventEmitter} from 'react-native';
import {Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const Sound = require('react-native-sound');
const musicDir = dirs.MainBundleDir+'/images';
const apiUrl = 'http://api.strider.site';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class MusicList extends Component {
   
    constructor(props){
        super(props);
        this.state = {
             musicList:['love.aac','duelist.aac','flower.aac']
        };
        
    }

    componentWillMount() {
        // get music list from the file system
        /*fs.ls(musicDir)
            .then((files)=>{
                this.setState({
                    musicList:files
                });
            })
            .catch((err)=>{
                // if file doesn't exist, mkdir
                fs.mkdir(musicDir);
            });*/

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
                    {(this.state.musicList.length)?
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.musicList)}
                        renderRow={(rowData) => <Button transparent={true} block onPress={()=>this._onMusicSelected(rowData)}><Text>{rowData.split(".")[0]}</Text></Button>}
                        enableEmptySections={true}
                    />
                    :<Container><Text note style={{fontSize:14,padding:20}}>啊噢，您似乎还没有伴奏，立刻去“分享”看看其他颂客的作品吧~</Text></Container>
                    }
                </Content>
            </Container>
            /* jshint ignore: end */
        );
    }
}