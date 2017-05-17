import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
import MusicPlayer from './musicPlayer';

let player = new MusicPlayer();

const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const docDir = dirs.DocumentDir+'/docs';
const musicDir = dirs.DocumentDir+'/music';
const audioDir = dirs.DocumentDir+'/audio';

// component ColButton
class ColButton extends Component{
    render(){
        return(
            /* jshint ignore: start */
            <Col style={styles.col}>
                <Button transparent style={styles.audioButton}>
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
            musicPlaying:false,
            fixed:false
        };
    }
    componentDidMount() {
        console.log(this.props.audio);
    }
    //on click, play or stop music
    _musicOnClick(){
        player.musicPlayAndStop(`${musicDir}/${this.state.music}`,(playing)=>{
            this.setState({
                musicPlaying:playing
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
                                <Text note>本文段中排第 <Pink>1</Pink> 名</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={styles.commomItem}>
                            <Grid>
                                <ColButton iconName="md-heart" text="点赞"/>
                                <ColButton iconName="md-people" text="评论"/>
                                <ColButton iconName="md-albums" text="收藏"/>
                                <ColButton iconName="md-arrow-dropright-circle" text="播放"/>
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
                            <Button block rounded style={styles.challengeButton}><Text>挑战本文段</Text></Button>  
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