import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View} from 'react-native';
import Modal from 'react-native-modalbox';
import {InputGroup, Input, Textarea,Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import MusicPlayer from './musicPlayer';
let player = new MusicPlayer();
let Dimensions = require('Dimensions');
let {width,height} = Dimensions.get('window');
const Realm = require('realm');
import Audio from '../models/audio';
import Doc from '../models/doc';
import ID from '../models/id';
let realm = new Realm({
    schema:[Audio,Doc,ID]
});
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const audioDir = dirs.DocumentDir;
const apiUrl = 'http://120.77.250.109';
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

export default class SimpleAudioPage extends Component {
    
    constructor(props){
        super(props);
        this.state={
            musicPlaying:false,
            uploading:false,
            modalVisible:false,
            comment:''
        };
    }
    componentWillMount() {
        console.log(this.props.audio)
    }

    //on click, play or stop music
    _playAudio(){
        player.musicPlayAndStop(`${audioDir}/${this.props.audio.title}.aac`,(playing)=>{
            this.setState({
                musicPlaying:playing
            });
        });
    }
    _shareToCloud(){
        let audio = this.props.audio;
        audio.intro = this.state.comment;
        console.log(`${audioDir}/${audio.title}.aac`);
        this.setState({
            uploading:true
        });
        RNFetchBlob.fetch('POST', `${apiUrl}/upload/audio`, {
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'audio', filename : `${audio.title}.aac`, data: RNFetchBlob.wrap(`${audioDir}/${audio.title}.aac`)},
            { name : 'data', data : JSON.stringify(audio)}
        ])
        .then((res)=>{
            console.log(res.json());
            this.setState({
                uploading:false,
                modalVisible:false
            });
            Toast.show({
                text:'发布成功！',
                position:'bottom',
                buttonText:'好'
            });
        })
        .catch((err)=>{
            this.setState({
                uploading:false,
            });
            console.log(err);
            Toast.show({
                text:'无法连接到互联网',
                buttonText:'好',
                position:'bottom'
            });
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
                                <Thumbnail source={require('../image/ic_launcher.png')} style={styles.audioImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.audioTitle}>{this.props.audio.title}</Text>
                                <Text note>颂客：<Pink>{this.props.audio.author}</Pink></Text>
                                <Text note>文段名：<Pink>{this.props.audio.doc.title}</Pink></Text>
                            </Body>
                        </ListItem>
                    </List>
                    <Button onPress={()=>this._playAudio()}rounded block style={styles.challengeButton}><Text>{this.state.musicPlaying?"停止":"播放"}</Text></Button>
                            <Button onPress={()=>this.setState({modalVisible:true})}rounded block style={styles.challengeButton}><Text>发布</Text></Button>
                    <List>
                        <ListItem>
                            
                        </ListItem>
                        <ListItem itemDivider><Text>文段内容</Text></ListItem> 
                        <ListItem style={styles.docContainer}>
                            <Body>
                                <Text note>{this.props.audio.doc.content}</Text>
                            </Body>
                        </ListItem>          
                    </List>
                    </Content>
                    <Modal onClosed={()=>this.setState({modalVisible:false})} isOpen={this.state.modalVisible} position="center" style={{padding:20,height:300,width:300,borderRadius:10}}>
                        <Container>
                            <Content>
                                    <Text>将作品和大家分享</Text>
                                    <InputGroup borderType='regular'>
                                        <Textarea   style={{height:180,width:200}} onChangeText={(comment)=>this.setState({comment:comment})} value={this.state.comment} placeholder={"您的留言"}/>
                                    </InputGroup>
                                    <Button block rounded style={{backgroundColor:'#FF80AB'}} onPress={()=>this._shareToCloud()}>
                                        <Text>{this.state.uploading?'上传中...':'现在分享!'}</Text>
                                    </Button>
                            </Content>
                        </Container>
                    </Modal>
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
    audioTitle:{
        color:'#008975',
        fontSize:20,
        margin:5
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

    icon:{
        color:'#FF4081'
    },
    challengeButton:{
        marginTop:15,
        marginHorizontal:25,
        backgroundColor:'#FF80AB'
    }
};