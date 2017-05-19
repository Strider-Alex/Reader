import React, { Component } from 'react';
import {Button, Body,Container, Content, Text, Icon, Toast,List,ListItem,Left,Right,Thumbnail,Header,Item,Input } from 'native-base';
import AudioDownloadView from './audioDownloadView';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const otherDir = dirs.DocumentDir+'/other';
const apiUrl = 'http://api.strider.site';
export default class ShareAudio extends Component {
    constructor(props){
        super(props);
        this.state={
            audioList:[],
            downloading:-1
        };
    }
    //did mount, get audio data from api
    componentWillMount(){
         RNFetchBlob
            .fetch('GET',apiUrl+'/reader/audio')
            .then((res)=>{
                const data = res.json().data;
                this.setState({
                    audioList:data
                });
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    // on click, download audio from api, store json file
    _onDownloadClick(file,i){
        let audio = this.state.audioList[i];
        this.setState({
            downloading:i
        });
        console.log(`${apiUrl}/reader/audio/download?_id=${audio._id}`);
        RNFetchBlob
            .config({
             // response data will be saved to this path if it has access right.
                path :`${otherDir}/${audio._id}.aac`
            })
            .fetch('GET',`${apiUrl}/reader/audio/download?_id=${audio._id}`)
            .then((res)=>{
                //store json file
                return fs.writeFile(
                    `${otherDir}/json/${audio._id}.json`,
                    JSON.stringify(audio),
                    'utf8'
                );
            })
            .then(()=>{
                this.setState({
                    downloading:-1
                });
                // show toast messages: download succeed!
                Toast.show({
                    text: '作品已添加至我的收藏',
                    position: 'bottom',
                    buttonText: '好'
                });
            })
            .catch((err)=>{
                console.log(err);
                this.setState({
                    downloading:-1
                });
            });
    }
    //go to audio page
    _goToAudio(audio){
        Actions.audioPage({
            audio:audio
        });
    }
    render(){    
        return(
            /*jshint ignore:start*/
            <Container>
                <Content>
                    <List dataArray={this.state.audioList} renderRow={(audio)=>
                        <ListItem avatar button onPress={()=>this._goToAudio(audio)}>
                           <Left>
                                <Thumbnail source={require('../image/ic_launcher.png')} style={styles.audioImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.audioTitle}>{audio.title}</Text>
                                <Text note>{audio.author}</Text>
                            </Body>
                            <Right>
                                <Text note><Icon style={styles.likeIcon} name="md-heart"/>{"  "+1}</Text>
                            </Right>

                        </ListItem>
                    }>
                    </List>
                </Content>
            </Container>
            /*jshint ignore:end*/
        );     
    }
}

const styles={
    audioImage:{
        height:40,
        width:40
    },
    audioTitle:{
        color:'#008975'
    },
    likeIcon:{
        color:'#FF4081',
        fontSize:20
    }
};