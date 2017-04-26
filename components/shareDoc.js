import React, { Component } from 'react';
import {Container, Content, Button,Text,Spinner} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const apiUrl = 'http://api.strider.site';
const docDir = dirs.DocumentDir+'/docs';
export default class ShareDoc extends Component {
    constructor(props){
        super(props);
        this.state={
            downloading:false
        };
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
            .catch((err)=>{
                console.log(err);
            });
    }
    render(){
        /*jshint ignore:start*/
        return(
            <Container style={{top:80}}>
                <Content>
                    <Button block style={{marginHorizontal:20}} onPress={()=>this._downloadDoc()}>
                        {(()=>{
                            if(this.state.downloading){
                                return <Spinner color='#007AFF' style={{height:5,width:5}} />
                            }
                            else{
                                return <Text>下载推荐文本！</Text>
                            }
                        })()}
                    </Button>
                </Content>
            </Container>
        );
        /*jshint ignore:end*/
    }
}