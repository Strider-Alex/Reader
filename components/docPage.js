import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';

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
            collected:false
        };
    }
    componentWillMount() {
        console.log(this.props.doc.title)
        let obj = realm.objects('Doc').filtered(`title=='${this.props.doc.title}'`);
        //set collected if it's already in database
        if(Object.keys(obj).length !== 0){
            this.setState({
                collected:true
            });
        }
        console.log(obj);
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
                    length:this.props.length,
                    date:this.props.date,
                    liked:false,
                    content:this.props.doc.content,
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
    render() {
        return (
            /* jshint ignore: start */
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem style={styles.header}>
                            <Left>
                                <Thumbnail source={require('../image/ic_launcher.png')} style={styles.docImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.docTitle}>{this.props.doc.title}</Text>
                                <Text note>作者：<Pink>{this.props.doc.author}</Pink></Text>
                                <Text note>共有 <Pink>1</Pink> 位颂客朗诵</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={styles.commomItem}>
                            <Grid>
                                <ColButton iconName="md-heart" text="点赞"/>
                                <ColButton iconName="md-chatbubbles" text="评论"/>
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