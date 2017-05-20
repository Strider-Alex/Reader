import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View,AsyncStorage } from 'react-native';
import {Form,Input,Item,Button, Label,Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast,Spinner} from 'native-base';
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

// props: remoteID,itemType

export default class Comment extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            comments:[],
            myComment:null,
            loaded:false
        };
    }

    _getData(){
        
        RNFetchBlob
            .fetch('GET',`${apiUrl}/${this.props.itemType}/${this.props.remoteID}`)
            .then((res)=>{
                const data = res.json();
                this.setState({
                    comments:data,
                    loaded:true
                });
            })
            .catch((err)=>{
                console.log(err);
                this.setState({
                    loaded:true
                });
                Toast.show({
                    text:'无法连接到互联网',
                    buttonText:'好',
                    position:'bottom'
                });
            });
    }
   componentWillMount(){
       console.log(`${apiUrl}/${this.props.itemType}/${this.props.remoteID}`);
       this._getData();
   }
   _sendComment(){
       AsyncStorage.getItem('user',(err,user)=>{
           console.log(user);
            if(user){
                RNFetchBlob
                    .fetch('POST',`${apiUrl}/comment/${this.props.itemType}`, {
                    'Content-Type' : 'multipart/form-data',
                }, [
                    { name : 'ID', data : String(this.props.remoteID)},
                    { name : 'content', data : this.state.myComment},
                    { name : 'account', data : user}
                ])
                    .then((res)=>{
                        console.log(res);
                        Toast.show({
                            text:'评论成功',
                            buttonText:'好',
                            position:'bottom'
                        });
                        this._getData();
                    })
                    .catch((err)=>{
                        console.log(err);
                        this.setState({
                            loaded:true
                        });
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
                    <List dataArray={this.state.comments} renderRow={(comment)=>
                        <ListItem>
                            <Body>
                                <Text>{comment.commenter}</Text>
                                <Text note>{comment.content}</Text>
                            </Body>
                            <Right>
                                <Text note>{new Date(comment.date).toLocaleDateString()}</Text>
                            </Right>
                        </ListItem>
                    }>
                    </List>
                    {this.state.loaded?null:<Spinner/>}
                    {this.state.loaded&&this.state.comments.length==0?<Body><Text style={{marginTop:20}} note>暂无评论</Text></Body>:null}
                    <Form style={{margin:20}}>
                        <Item rounded>
                            <Input style={{height:100,borderColor:'#FF80AB'}} multiline onChangeText={(data)=>this.setState({myComment:data})} value={this.state.myComment}/>
                        </Item>
                        <Button rounded block onPress={()=>this._sendComment()}style={{marginTop:5,backgroundColor:'#FF4081'}}><Text>发表评论</Text></Button>
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