import React, { Component } from 'react';
import { View,ListView,Text,TouchableHighlight, Button,DeviceEventEmitter} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
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
            // select doc
            this.props.onStateChange({
                doc:doc
            });
            // emit event for createNewAudio view
            DeviceEventEmitter.emit("docChanged",doc);
            // go back
            this.props.navigator.pop();
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
                    newState.docList.push(doc.title);
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
            <View>
                <Button title={(()=>{
                    if(this.state.downloading) return "Downloading";
                    else return "Dowload default docs";})()}
                onPress={()=>this._downloadDoc()}/>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.docList)}
                    renderRow={(rowData) => <TouchableHighlight onPress={()=>this._onDocSelected(rowData)}><Text>{rowData.split(".")[0]}</Text></TouchableHighlight>}
                    enableEmptySections={true}
                />
            </View>
            /* jshint ignore: end */
        );
    }
}