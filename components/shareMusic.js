import React, { Component } from 'react';
import {Container, Content, Card, CardItem, Text, Button,Icon,Right} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import ClickableListView from './clickableListView';
const dirs = RNFetchBlob.fs.dirs;
const apiUrl = 'http://api.strider.site';
const musicDir = dirs.DocumentDir+'/music';
export default class ShareMusic extends Component {
    constructor(props){
        super(props);
        this.state={
            musicList:[],
            downloading:-1
        };
    }
    componentDidMount(){
        RNFetchBlob
            .fetch('GET',apiUrl+'/reader/music')
            .then((res)=>{
                const data = res.json().data;
                this.setState({
                    musicList:data
                });
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    //download music from api
    _downloadMusic(music,i){
        this.setState({
            downloading:i
        });
        RNFetchBlob
            .config({
             // response data will be saved to this path if it has access right.
                path :`${musicDir}/${music}`
            })
            .fetch('GET', `${apiUrl}/reader/music/${music}`)
            .then((res) => {
                this.setState({
                    downloading:-1
                });
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path());
            })
            .catch((err)=>{
                this.setState({
                    downloading:-1
                });
                console.log(err);
            });
    }
    render(){
        /*jshint ignore:start*/
        return(
            <Container style={{top:80}}>
                <Content>
                    <ClickableListView data={this.state.musicList} iconName="md-download" active={this.state.downloading} activeIconName="spinner" click={(music,i)=>this._downloadMusic(music,i)}/>
                </Content>
            </Container>
        );
        /*jshint ignore:end*/
    }
}