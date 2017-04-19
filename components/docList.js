import React, { Component } from 'react';
import { View,ListView,TouchableHighlight,DeviceEventEmitter} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Footer, FooterTab, Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const apiUrl = 'http://api.strider.site/doc';
const docDir = dirs.DocumentDir+'/docs';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class DocList extends Component {

    constructor(props){
        super(props);
        this.state = {
            //docList:[],
            docList:[],
            // if it's downloading the docs from api
            downloading:false
        };
        
    }

    componentDidMount() {
        if(fs.isDir(docDir)){
            // get file directory
            fs.ls(docDir).then((files)=>{
                this.setState({
                    docList:files
                });
            }).catch((err)=>{
                console.log(err);
            });
        }
        else{
            // if file doesn't exist, mkdir
            fs.mkdir(docDir);
        }
    }
    _onDocSelected(doc){
        if(doc){
            // emit event for createNewAudio view
            DeviceEventEmitter.emit("docChanged",doc);
            // go back
            Actions.pop();
        }
    }
    // download default docs from the API
    _downloadDoc(){
        // set start downloading
        this.setState({
            downloading:true
        });
        RNFetchBlob
            .fetch('GET', apiUrl+'?default=true')
            .then((res)=>{
                let data = res.json().data;
                // new state object
                let newState = {
                    downloading:false,
                    docList:[]
                };
                // write data to seperate JSON files
                let tasks=[];
                data.forEach((doc)=>{
                    console.log(docDir+`/${doc.title}.json`);
                    newState.docList.push(`${doc.title}.json`);
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
    render() {
        return (
            /* jshint ignore: start */
            <Container style={{marginTop:100}}>
                <Content>
                    <Button block onPress={()=>this._downloadDoc()}>
                        <Text>
                            {(()=>{
                                if(this.state.downloading) return "Downloading";
                                else return "Dowload default docs";
                            })()}
                        </Text>
                    </Button>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.docList)}
                        renderRow={(rowData) => <Button block onPress={()=>this._onDocSelected(rowData)}><Text>{rowData.split(".")[0]}</Text></Button>}
                        enableEmptySections={true}
                    />
                </Content>
            </Container>
            /* jshint ignore: end */
        );
    }
}