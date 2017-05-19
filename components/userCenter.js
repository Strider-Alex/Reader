import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View,Image,AsyncStorage } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Card,CardItem,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import MusicPlayer from './musicPlayer';
import { Player,ReactNativeAudioStreaming } from 'react-native-audio-streaming';
let player = new MusicPlayer();

const Realm = require('realm');
import Audio from '../models/audio';
import Doc from '../models/doc';
import ID from '../models/id';
let realm = new Realm({
    schema:[Audio,Doc,ID]
});
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const docDir = dirs.DocumentDir+'/docs';
const musicDir = dirs.DocumentDir+'/music';
const audioDir = dirs.DocumentDir+'/audio';
const apiUrl = 'http://api.strider.site/reader';


class Pink extends Component{
    render(){
        return(
            /* jshint ignore: start */
            <Text note style={styles.pink}>{this.props.children}</Text>
            /* jshint ignore: end */
        );
    }
}

// props: audio - audio object passed by react-native-router-flux Actions

export default class Activity extends Component {
    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('user',(err,user)=>{
            this.setState({
                user:user
            });
        });
    }
    _logout(){
        AsyncStorage.removeItem('user',(err)=>{
            if(err) console.log(err);
            Actions.extra();
        });
    }
    render() {
        return (
             /* jshint ignore: start */
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem style={styles.header}>
                            <Left>
                                <Thumbnail source={require('../image/user.png')} style={styles.audioImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.title}>{this.state.user}</Text>
                                <Text note>颂客等级：<Pink>默默无闻</Pink></Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem itemDivider><Text>签名档</Text></ListItem>
                        <ListItem style={styles.comment}>
                            <Text note>This APP is so cool! I love Songke!</Text>
                        </ListItem>
                        <ListItem itemDivider><Text>其他</Text></ListItem> 
                            <Button rounded block style={styles.logoutButton} onPress={()=>this._logout()}><Text>退出登录</Text></Button>          
                    </List>
                    </Content>
            </Container>
            /* jshint ignore: end */
        );
    }
}
const styles={
    header:{
        height:140,
        marginLeft:0,
    },
    container:{
        marginTop:53,
    },
    audioImage:{
        height:100,
        width:100,
        marginLeft:10
    },
    title:{
        color:'#008975',
        fontSize:20
    },
    commomItem:{
        paddingTop:0,
        marginLeft:0,
        paddingBottom:0
    },
    comment:{
        marginLeft:0,
        paddingLeft:15
    },
    docContainer:{
        marginLeft:0,
        paddingRight:0,
        paddingLeft:15
    },
    col:{
        height:50
    },
    audioButton:{
        marginHorizontal:0
    },
    icon:{
        color:'#FF4081'
    },
    pink:{
        color:'#F50057'
    },
    logoutButton:{
        marginHorizontal:50,
        marginVertical:15,
        backgroundColor:'red'
    }
};