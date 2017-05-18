import React, { Component } from 'react';
import {DeviceEventEmitter,Platform,PermissionsAndroid, ScrollView,Keyboard,View } from 'react-native';
import {Button, Container, Content,Text, Icon, Body,Left,Right,List,ListItem,Thumbnail,Grid,Col} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';

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

// props: doc - doc object passed by react-native-router-flux Actions

export default class DocPage extends Component {
    
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log(this.props.doc);
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
                                <ColButton iconName="md-people" text="评论"/>
                                <ColButton iconName="md-albums" text="收藏"/>
                                <ColButton iconName="md-mic" text="朗诵"/>
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