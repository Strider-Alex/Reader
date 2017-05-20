import React, { Component } from 'react';
import {Container, Content,Text, Button,Icon,Right,Left,List,ListItem,Thumbnail,Body,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import ClickableListView from './clickableListView';
import {Actions} from 'react-native-router-flux';
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
    componentWillMount(){
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
                // show toast messages: download succeed!
                Toast.show({
                    text: '伴奏下载成功',
                    position: 'bottom',
                    buttonText: '好'
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
    _goToMusic(music){
        Actions.musicPage({
            music:music
        });
    }
    render(){
        /*jshint ignore:start*/
        return(
            <Container>
                <Content>
                    <List dataArray={this.state.musicList} renderRow={(music)=>
                        <ListItem avatar button onPress={()=>this._goToMusic(music)}>
                            <Left>
                                <Thumbnail source={require('../image/ic_launcher.png')} style={styles.musicImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.musicTitle}>{music}</Text>
                            </Body>
                        </ListItem>
                    }>
                    </List>
                </Content>
            </Container>
        );
        /*jshint ignore:end*/
    }
}

const styles={
    musicImage:{
        height:40,
        width:40
    },
    musicTitle:{
        color:'#008975'
    },
    likeIcon:{
        color:'#FF4081',
        fontSize:20
    }
};