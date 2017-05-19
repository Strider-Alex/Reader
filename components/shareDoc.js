import React, { Component } from 'react';
import {Container, Content, Button,Text,List,ListItem,Left,Right,Body,Thumbnail,Icon} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const apiUrl = 'http://api.strider.site';
const docDir = dirs.DocumentDir+'/docs';
export default class ShareDoc extends Component {
    constructor(props){
        super(props);
        this.state={
            docList:[]
        };
    }
    componentWillMount(){
        RNFetchBlob
            .fetch('GET','http://api.strider.site'+'/reader/doc?default=true',{
                'Accept-Encoding': 'gzip, deflate, sdch',
'Accept-Language': 'zh-CN,zh;q=0.8'

            })
            .then((res)=>{
                let docList = res.json().data;
                this.setState({
                    docList:docList
                });
            })
            .catch((e)=>console.log(e));
    }
     // download default docs from the API
    _downloadDoc(){
        // set start downloading
        this.setState({
            downloading:true
        });
        RNFetchBlob
            .fetch('GET', apiUrl+'/reader/doc?default=true')
            .then((res)=>{
                let data = res.json().data;
                // new state object
                let newState = {
                    downloading:false
                };
                // write data to seperate JSON files
                let tasks=[];
                data.forEach((doc)=>{
                    tasks.push(
                        fs.writeFile(
                            docDir+`/${doc.title}.json`,
                            JSON.stringify(doc),
                            'utf8'
                        )
                    );
                });
                // finish dowload, update states
                this.setState(newState);
                // return all tasks
                return Promise.all(tasks);
            })
            .then(()=>{
                // show toast messages: download succeed!
                Toast.show({
                    text: '文本下载成功',
                    position: 'bottom',
                    buttonText: '好'
                });
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    _goToDoc(doc){
        Actions.docPage({
            doc:doc
        });
    }
    render(){
        /*jshint ignore:start*/
        return(
            <Container>
                <Content>
                    <List dataArray={this.state.docList} renderRow={(doc)=>
                        <ListItem avatar button onPress={()=>this._goToDoc(doc)}>
                           <Left>
                                <Thumbnail source={require('../image/ic_launcher.png')} style={styles.docImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.docTitle}>{doc.title}</Text>
                                <Text note>{doc.author}</Text>
                            </Body>
                            <Right>
                                <Text note><Icon style={styles.likeIcon} name="md-heart"/>{"  "+1}</Text>
                            </Right>

                        </ListItem>
                    }>
                    </List>
                </Content>
            </Container>
        );
        /*jshint ignore:end*/
    }
}

const styles={
    docImage:{
        height:40,
        width:40
    },
    docTitle:{
        color:'#008975'
    },
    likeIcon:{
        color:'#FF4081',
        fontSize:20
    }
};