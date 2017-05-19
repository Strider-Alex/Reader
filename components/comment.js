import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Form,Input,Item,Button, Label,Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
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

export default class Comment extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            comment:null
        };
    }
   
    render() {
        data=[{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'},{user:'zhangsan',comment:'zhanhahahah'}];
        return (
            /* jshint ignore: start */
            <Container style={styles.container}>
                    <List dataArray={data} renderRow={(item)=>
                        <ListItem>
                            <Body>
                                <Text>{item.user}</Text>
                                <Text note>{item.comment}</Text>
                            </Body>
                        </ListItem>
                    }>
                    </List>
                    <Form style={{margin:20}}>
                        <Item rounded>
                            <Input style={{height:100,borderWidth:1,borderColor:'#FF80AB'}} multiline onChangeText={(data)=>this.setState({comment:data})} value={this.state.comment}/>
                        </Item>
                        <Button rounded block style={{marginTop:5,backgroundColor:'#FF4081'}}><Text>发表评论</Text></Button>
                    </Form>
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
    footer:{
        height:200,
        bottom:0,
        position:'absolute',
        backgroundColor:'#FFFFFF'
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