import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col} from 'native-base';
import {Actions} from 'react-native-router-flux';

const Realm = require('realm');
import Audio from '../models/audio';
import Doc from '../models/doc';
import ID from '../models/id';
let realm = new Realm({
    schema:[Audio,Doc,ID]
});

import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const Sound = require('react-native-sound');
const musicDir = dirs.DocumentDir+'/music';
const apiUrl = 'http://api.strider.site';

class MyThumbnail extends Component{
    render(){
        /*jshint ignore:start*/
        if(this.props.itemType=='本地文本'){
            return (<Thumbnail square source={require('../image/doc.png')} style={styles.itemImage}/>);
        }
        else if(this.props.itemType=='本地伴奏'){
            return (<Thumbnail square source={require('../image/music.jpeg')} style={styles.itemImage}/>);
        }
        else{
            return (<Thumbnail square source={require('../image/ic_launcher.png')} style={styles.itemImage}/>);
        }
        /*jshint ignore:end*/
    }
}
//props: itemType-colleciton/creation/doc/audio
export default class simpleList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            itemList:[]
        };
    }
    componentWillMount() {
        let itemList=[];
        if(this.props.itemType=='收藏作品'){
            itemList = realm.objects('Audio').filtered('collection==true');
        }
        else if(this.props.itemType=='我的创作'){
            itemList = realm.objects('Audio').filtered('collection==false');
        }
        else if(this.props.itemType=='本地文本'){
            itemList = realm.objects('Doc');
        }
        else if(this.props.itemType=='本地伴奏'){
             itemList = ['love.aac','duelist.aac','flower.aac']
        }
        if(itemList){
            this.setState({
                itemList:itemList
            });
        }
    }
    

    _goToItem(item){
        if(this.props.itemType=='收藏作品'){
            Actions.audioPage({
                audio:item
            });
        }
        else if(this.props.itemType=='我的创作'){
            Actions.simpleAudioPage({
                audio:item
            });
        }
        else if(this.props.itemType=='本地文本'){
            Actions.docPage({
                doc:item
            });
        }
        else if(this.props.itemType=="本地伴奏"){
            Actions.musicPage({
                music:item
            });
        }
    }

    render() {
        return (
             /*jshint ignore:start*/
            <Container style={styles.container}>
                <Content>
                    <List dataArray={this.state.itemList} renderRow={(item)=>
                        <ListItem avatar button onPress={()=>this._goToItem(item)}>
                           <Left>
                                <MyThumbnail itemType={this.props.itemType}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.itemTitle}>{item.title?item.title:item}</Text>
                                <Text note>{item.author}</Text>
                            </Body>

                        </ListItem>
                    }>
                    </List>
                    {this.state.itemList.length===0?<Body><Text style={{marginTop:20}} note>暂无数据</Text></Body>:null}
                </Content>
            </Container>
            /*jshint ignore:end*/
        );
    }
}
const styles={
    container:{
        marginTop:54
    },
    itemImage:{
        height:40,
        width:40
    },
    itemTitle:{
        color:'#008975'
    },
    likeIcon:{
        color:'#FF4081',
        fontSize:20
    }
};