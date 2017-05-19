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
const Realm = require('realm');
import Audio from '../models/audio';
import Doc from '../models/doc';
import ID from '../models/id';
let realm = new Realm({
    schema:[Audio,Doc,ID]
});
export default class DocList extends Component {

    constructor(props){
        super(props);
        this.state = {
            //docList:[],
            docList:[],
            // if it's downloading the docs from api
        };
        
    }

    componentWillMount() {
        this.setState({
            docList:realm.objects('Doc')
        });
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
                    {(this.state.docList.length)?
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.docList)}
                        renderRow={(rowData) => (
                            <Button block transparent={true} onPress={()=>this._onDocSelected(rowData)}>
                                <Text>{rowData.title.split(".")[0]}</Text>
                            </Button>)}
                        enableEmptySections={true}
                    />
                    :<Container><Text note style={{fontSize:14,padding:20}}>啊噢，您似乎还没有文本，立刻去“发现颂客”下载吧~</Text></Container>
                    }
                </Content>
            </Container>
            /* jshint ignore: end */
        );
    }
}