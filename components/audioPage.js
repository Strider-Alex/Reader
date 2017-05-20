import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View,AsyncStorage } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import {ReactNativeAudioStreaming} from 'react-native-audio-streaming';

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

//get id
let getID=(schemaName)=>{
    let obj = realm.objectForPrimaryKey('ID',schemaName);
    if(obj){
        obj.id++;
    }else{
        realm.create('ID',{schema:schemaName,id:0});
    }
    return obj?obj.id+1:0;
};

// component ColButton
class ColButton extends Component{
    render(){
        return(
            /* jshint ignore: start */
            <Col style={styles.col}>
                <Button transparent style={styles.audioButton} onPress={()=>this.props.onPress()}> 
                    <Icon name={this.props.iconName} style={styles.icon}/><Text style={styles.icon}>{this.props.text}</Text>
                </Button>
            </Col>
            /* jshint ignore: end */
        );
    }
}

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

export default class AudioPage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            // if the music is playing now
            collected:false,
            //if music is playing
            musicPlaying:false,
            liked:false
        };
    }
    componentWillMount() {
        console.log(this.props.audio);
        let obj = realm.objects('Audio').filtered(`remoteID=='${this.props.audio.remoteID}'`);
        //set collected if it's already in database
        
        if(Object.keys(obj).length !== 0){
            this.setState({
                collected:true,
                liked:false
            });
        }
         //check if user has liked the audio
        AsyncStorage.getItem('user',(err,user)=>{
            if(err){
                console.log(err);
            }
            if(user){
                RNFetchBlob.fetch('GET', `${apiUrl}/lookup/likes/audio/${this.props.audio.remoteID}?account=${user}`)
                .then((res)=>{
                    const data=res.json();
                    if(data.status){
                        this.setState({
                            liked:true
                        });
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    Toast.show({
                        text:'无法连接到互联网',
                        buttonText:'好',
                        position:'bottom'
                    });
                });
            }     
        });
    }
    //add audio to collection
    _addToCollection(){
        let doc;
        let docs = realm.objects('Doc').filtered(`title=='${this.props.audio.doc.title}'`);
        realm.write(()=>{
            //check if doc already exist
            if(Object.keys(docs).length === 0){
                doc = {
                    id:getID('Doc'),
                    title:this.props.audio.doc.title,
                    author:this.props.audio.doc.author,
                    book:this.props.audio.doc.book,
                    remoteID:this.props.audio.doc.remoteID,
                    length:this.props.audio.doc.length,
                    date:new Date(this.props.audio.doc.date),
                    content:this.props.audio.doc.content,
                };
            }else{
                doc = docs['0'];
            }
            let audioResult = realm.create('Audio',{
                id:getID('Audio'),
                title:  this.props.audio.title,
                author: this.props.audio.author,
                size: 12,
                duration:55,
                music:this.props.audio.music,
                comment:this.props.audio.comment,
                doc:doc,
                date:new Date(this.props.audio.date),
                collection:true,
                remoteID:this.props.audio.remoteID
            },true);
            console.log(audioResult);
            console.log(realm.objects('Audio').length);
            console.log(realm.objects('Doc').length);
        });
        this.setState({
            collected:true
        });
         Toast.show({
            text: '收藏成功！',
            position: 'bottom',
            buttonText: '好'
        });
    }
    //on click, play or stop music
    _playAudio(){
        if(this.state.musicPlaying){
            ReactNativeAudioStreaming.stop();
        }
        else{
            console.log(`${apiUrl}/download/audio/${this.props.audio.remoteID}`);
            ReactNativeAudioStreaming.play(`${apiUrl}/download/audio/${this.props.audio.remoteID}`,{showIniOSMediaCenter: true, showInAndroidNotifications: true});
        }
        this.setState({
            musicPlaying:!this.state.musicPlaying
        });
    }
    //go to comment
    _goToComment(){
        Actions.comment({itemType:'audio',remoteID:this.props.audio.remoteID});
    }
     _like(){
        //like the doc
        AsyncStorage.getItem('user',(err,user)=>{
            if(err){
                console.log(err);
            }
            if(user){
                RNFetchBlob.fetch('POST', `${apiUrl}/like/audio`,{
                    'Content-Type' : 'multipart/form-data',
                }, [
                    { name : 'account', data:user},
                    { name : 'ID', data : String(this.props.audio.remoteID)}
                ])
                .then((res)=>{
                    console.log(res.json());
                    this.setState({
                        liked:true
                    });
                })
                .catch((err)=>{
                    console.log(err);
                    Toast.show({
                        text:'无法连接到互联网',
                        buttonText:'好',
                        position:'bottom'
                    });
                });
            }     
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
                                <Text note>本文段中排第 <Pink>1</Pink> 名</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={styles.commomItem}>
                            <Grid>
                                {this.state.liked?
                                <ColButton iconName="md-checkmark-circle-outline" text="已赞" onPress={()=>{}}/>:
                                <ColButton iconName="md-heart" text="点赞" onPress={()=>this._like()}/>
                                }
                                <ColButton iconName="md-chatbubbles" onPress={()=>this._goToComment()} text="评论"/>
                                {this.state.collected?
                                <ColButton iconName="md-happy" text="已收藏" onPress={()=>{}}/>:
                                <ColButton iconName="md-albums" text="收藏" onPress={()=>this._addToCollection()}/>
                                }
                                {this.state.musicPlaying?
                                <ColButton iconName="md-pause" text="停止" onPress={()=>this._playAudio()}/>:
                                <ColButton iconName="md-arrow-dropright-circle" text="播放" onPress={()=>this._playAudio()}/>
                                }            
                                
                            </Grid>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem itemDivider><Text>作者留言</Text></ListItem>
                        <ListItem style={styles.comment}>
                            <Text note>{this.props.audio.comment}</Text>
                        </ListItem>
                        <ListItem itemDivider><Text>文段内容</Text></ListItem> 
                        <ListItem style={styles.docContainer}>
                            <Body>
                            <Text note>{this.props.audio.doc.content}</Text>
                            <Button block rounded style={styles.challengeButton} onPress={()=>Actions.docPage({doc:this.props.audio.doc})}><Text>挑战本文段</Text></Button>  
                            </Body>
                            
                        </ListItem>          
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
    challengeButton:{
        marginHorizontal:50,
        marginVertical:15,
        backgroundColor:'#FF80AB'
    }
};