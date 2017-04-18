import React, { Component } from 'react';
import { View,ListView,Text,TouchableHighlight, Button  } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const Sound = require('react-native-sound');
const musicDir = dirs.DocumentDir+'/music';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class MusicList extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            musicList:[]
        };
        
    }

    componentDidMount() {
        // get file directory
        fs.ls(musicDir).then((files)=>{
            for(let i in files){
                files[i]=files[i].split('.')[0];
            }
            this.setState({
                musicList:files
            });
        }).catch((err)=>{
            fs.mkdir(musicDir);
            console.log(err);
        });
    }
    _onDocSelected(music){
        if(music){
            // select doc
            this.props.onStateChange({
                music:music
            });
            // go back
            this.props.navigator.pop();
        }
    }
    
    render() {
        return (
            /* jshint ignore: start */
            <View>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.musicList)}
                    renderRow={(rowData) => <TouchableHighlight onPress={()=>this._onDocSelected(rowData)}><Text>{rowData}</Text></TouchableHighlight>}
                    enableEmptySections={true}
                />
            </View>
            /* jshint ignore: end */
        );
    }
}