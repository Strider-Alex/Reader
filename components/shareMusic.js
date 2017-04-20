import React, { Component } from 'react';
import {Container, Content, Card, CardItem, Text, Button,Icon,Right} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;
const apiUrl = 'http://api.strider.site';
const musicDir = dirs.DocumentDir+'/music';
export default class ShareMusic extends Component {
    constructor(props){
        super(props);
        this.state={
            musicList:[]
        };
    }
    componentDidMount(){
        RNFetchBlob
            .fetch('GET',apiUrl+'/music')
            .then((res)=>{
                const data = res.json().data;
                this.setState({
                    musicList:data
                })
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    //download music from api
    _downloadMusic(music){
        RNFetchBlob
            .config({
             // response data will be saved to this path if it has access right.
                path :`${musicDir}/${music}`
            })
            .fetch('GET', `${apiUrl}/music/${music}`)
            .then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    render(){
        /*jshint ignore:start*/
        return(
            <Container style={{top:80}}>
                <Content>
                    {
                        this.state.musicList.map((music,i)=>{
                            return( 
                                <Card key={i}>
                                    <CardItem>
                                        <Text>{music.split(".")[0]}</Text>
                                        <Right>
                                            <Icon name="md-download" onPress={()=>this._downloadMusic(music)}/>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }
                </Content>
            </Container>
        );
        /*jshint ignore:end*/
    }
}