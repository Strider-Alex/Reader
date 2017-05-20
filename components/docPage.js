import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View,AsyncStorage } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const apiUrl = 'http://120.77.250.109';
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

// props: doc - doc object passed by react-native-router-flux Actions

export default class DocPage extends Component {
    
    constructor(props){
        super(props);
        this.state={
            collected:false,
            liked:false
        };
    }
    componentWillMount() {
        console.log(this.props.doc.remoteID);
        let obj = realm.objects('Doc').filtered(`title=='${this.props.doc.title}'`);
        console.log(obj);
        //set collected if it's already in database
        if(Object.keys(obj).length !== 0){
            this.setState({
                collected:true
            });
        }
        //check if user has liked the doc
        AsyncStorage.getItem('user',(err,user)=>{
            if(err){
                console.log(err);
            }
            if(user){
                RNFetchBlob.fetch('GET', `${apiUrl}/lookup/likes/text/${this.props.doc.remoteID}?account=${user}`)
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

    //add doc to collection
    _addToCollection(){
        let docs = realm.objects('Doc').filtered(`title=='${this.props.doc.title}'`);
        realm.write(()=>{
            //check if doc already exist
            if(Object.keys(docs).length === 0){
                realm.create('Doc',{
                    id:getID('Doc'),
                    title:this.props.doc.title,
                    author:this.props.doc.author,
                    book:this.props.doc.book,
                    length:this.props.doc.length,
                    date:new Date(this.props.doc.date),
                    content:this.props.doc.content,
                    remoteID:this.props.doc.remoteID
                },true);
            }
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
    //read this doc
    _startReading(){
        // go to doc
        Actions.createNew({
            doc:this.props.doc
        });
        
    }
    _like(){
        //like the doc
        AsyncStorage.getItem('user',(err,user)=>{
            if(err){
                console.log(err);
            }
            if(user){
                RNFetchBlob.fetch('POST', `${apiUrl}/like/text`,{
                    'Content-Type' : 'multipart/form-data',
                }, [
                    { name : 'account', data:user},
                    { name : 'ID', data : String(this.props.doc.remoteID)}
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
                                <Thumbnail square source={require('../image/doc.png')} style={styles.docImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.docTitle}>{this.props.doc.title}</Text>
                                <Text note>作者：<Pink>{this.props.doc.author}</Pink></Text>
                                <Text note>共有 <Pink>1</Pink> 位颂客朗诵</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={styles.commomItem}>
                            <Grid>
                                {this.state.liked?
                                <ColButton iconName="md-checkmark-circle-outline" text="已点赞" onPress={()=>{}}/>:
                                <ColButton iconName="md-heart" text="点赞" onPress={()=>this._like()}/>
                                }
                                <ColButton iconName="md-chatbubbles" text="评论" onPress={()=>Actions.comment({itemType:'text',remoteID:this.props.doc.remoteID})}/>
                                {this.state.collected?
                                <ColButton iconName="md-happy" text="已收藏" onPress={()=>{}}/>:
                                <ColButton iconName="md-albums" text="收藏" onPress={()=>this._addToCollection()}/>
                                }
                                <ColButton iconName="md-mic" text="朗诵" onPress={()=>this._startReading()}/>
                            </Grid>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem itemDivider><Text>文段内容</Text></ListItem> 
                        <ListItem style={styles.docContainer}>
                            <Body>
                            <Text note>{this.props.doc.content}</Text>
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
    docImage:{
        height:100,
        width:100,
        marginLeft:10
    },
    docTitle:{
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