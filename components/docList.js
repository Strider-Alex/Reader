import React, { Component } from 'react';
import { View,ListView,TouchableHighlight,DeviceEventEmitter} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import {Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
const apiUrl = 'http://api.strider.site';
const docDir = dirs.DocumentDir+'/docs';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class DocList extends Component {

    constructor(props){
        super(props);
        this.state = {
            //docList:[],
            docList:[],
            // if it's downloading the docs from api
        };
        
    }

    componentDidMount() {
            // get file directory
        fs.ls(docDir)
            .then((files)=>{
                this.setState({
                    docList:files
                });
            })
            .catch((err)=>{
                // if file doesn't exist, mkdir
                fs.mkdir(docDir);
            })
    }
    _onDocSelected(doc){
        if(doc){
            // emit event for createNewAudio view
            DeviceEventEmitter.emit("docChanged",doc);
            // go back
            Actions.pop();
        }
    }
   
    render() {
        return (
            /* jshint ignore: start */
            <Container style={{marginTop:100}}>
                <Content>
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