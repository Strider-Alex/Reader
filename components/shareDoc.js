import React, { Component } from 'react';
import {Container, Content, Spinner,Button,Text,List,ListItem,Left,Right,Body,Thumbnail,Icon,Toast} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const apiUrl = 'http://120.77.250.109';
export default class ShareDoc extends Component {
    constructor(props){
        super(props);
        this.state={
            docList:[],
            loaded:false
        };
    }
    componentWillMount(){
        RNFetchBlob
            .fetch('GET',apiUrl+'/text',{
                'Accept-Encoding': 'gzip, deflate, sdch',
                'Accept-Language': 'zh-CN,zh;q=0.8'
            })
            .then((res)=>{
                let docList = res.json();
                this.setState({
                    docList:docList,
                    loaded:true
                });
            })
            .catch((e)=>{
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
    
    render(){
        /*jshint ignore:start*/
        return(
            this.state.loaded?
            <Container>
                <Content>
                    <List dataArray={this.state.docList} renderRow={(doc)=>
                        <ListItem avatar button onPress={()=>Actions.docPage({doc:doc})}>
                           <Left>
                                <Thumbnail square source={require('../image/doc.png')} style={styles.docImage}/>
                            </Left>                        
                            <Body>
                                <Text style={styles.docTitle}>{doc.title}</Text>
                                <Text note>{doc.author}</Text>
                            </Body>
                            <Right>
                                <Text note><Icon style={styles.likeIcon} name="md-heart"/>{"  "+doc.likes}</Text>
                            </Right>

                        </ListItem>
                    }>
                    </List>
                    {this.state.loaded&&this.state.docList.length==0?<Body><Text style={{marginTop:20}} note>暂无数据</Text></Body>:null}
                </Content>
            </Container>
            :<Spinner/>
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