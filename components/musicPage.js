import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import MusicPlayer from './musicPlayer';
let player = new MusicPlayer();
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const audioDir = dirs.DocumentDir;

// component ColButton
class ColButton extends Component{
    
    render(){
        return(
            /* jshint ignore: start */
            <Col style={styles.col}>
                <Button transparent  style={styles.audioButton}>
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

export default class MusicPage extends Component {
    
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log(this.props.music);
    }
    _playMusic(){
        player.musicPlayAndStop(`${this.props.music}`,(playing)=>{
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
                                <Thumbnail source={require('../image/music.jpeg')} style={styles.musicImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.musicTitle}>{this.props.music}</Text>
                            </Body>
                        </ListItem>
                            
                    </List>
                    <Button block rounded onPress={()=>this._playMusic()} style={styles.challengeButton}><Icon name="md-arrow-dropright-circle"/><Text>播放</Text></Button>  
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
    musicImage:{
        height:100,
        width:100,
        marginLeft:10
    },
    musicTitle:{
        color:'#008975',
        fontSize:20,
        margin:5
    },
    challengeButton:{
        marginHorizontal:50,
        marginVertical:15,
        backgroundColor:'#FF80AB'
    }
};