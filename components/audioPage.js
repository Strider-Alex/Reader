import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import MusicPlayer from './musicPlayer';
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
        };
    }
    componentWillMount() {
        let obj = realm.objects('Audio').filtered(`remoteID=='${this.props.audio._id}'`);
        //set collected if it's already in database
        
        if(Object.keys(obj).length !== 0){
            this.setState({
                collected:true
            });
        }
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
                    length:5,
                    date:new Date(),
                    likes:20,
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
                doc:doc,
                date:new Date(),
                collection:true,
                likes:10,
                remoteID:this.props.audio._id,
                path:this.props.audio.path
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
        player.musicPlayAndStop(`${apiUrl}/audio/download?_id=${this.props.audio._id}`,(playing)=>{
            this.setState({
                musicPlaying:playing
            });
        });
    }
    //go to comment
    _goToComment(){
        Actions.comment({
            item:this.props.audio
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
                                <ColButton iconName="md-heart" text="点赞"/>
                                <ColButton iconName="md-chatbubbles" onPress={()=>this._goToComment()} text="评论"/>
                                {this.state.collected?
                                <ColButton iconName="md-happy" text="已收藏" onPress={()=>{}}/>:
                                <ColButton iconName="md-albums" text="收藏" onPress={()=>this._addToCollection()}/>
                                }
                                {this.state.musicPlaying?
                                <ColButton iconName="md-arrow-dropright-circle" text="播放中" onPress={()=>this._playAudio()}/>:
                                <ColButton iconName="md-arrow-dropright-circle" text="播放" onPress={()=>this._playAudio()}/>
                                }            
                                
                            </Grid>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem itemDivider><Text>作者留言</Text></ListItem>
                        <ListItem style={styles.comment}>
                            <Text note>This APP is so cool! I love Songke!</Text>
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