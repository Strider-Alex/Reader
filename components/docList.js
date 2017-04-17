import React, { Component } from 'react';
import { View,ListView,Text,TouchableHighlight  } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs;
const dirs = fs.dirs;
console.log(dirs.DocumentDir);
console.log(dirs.CacheDir);
console.log(dirs.DCIMDir);
console.log(dirs.DownloadDir);

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class DocList extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            //docList:[],
            docList:[
                "Harry Potter",
                "Shakespeare",
                "Dou Po Cang Qiong"
            ],
            // if it's downloading the docs from api
            downloading:false
        };
        
    }

    componentDidMount() {
        // get file directory
        /*fs.ls(dirs.DocumentDir+'/docs').then((files)=>{
          console.log(files);
            this.setState({
                docList:files
            })
        }).catch((err)=>{
            // if file doesn't exist, mkdir
            fs.mkdir(dirs.DocumentDir+'/docs');
        })*/
    }
    _onDocSelected(doc){
        if(doc){
            console.log("Doc selected:"+doc);
            // select doc
            this.props.onStateChange({
                doc:doc
            });
            // go back
            this.props.navigator.pop();
        }
    }
    render() {
        return (
            /* jshint ignore: start */
            <View>
              {(() => {
                if(this.state.downloading){
                    return (
                        <Text>Downloading...</Text>
                    )
                }
              })()}
              <ListView
                dataSource={ds.cloneWithRows(this.state.docList)}
                renderRow={(rowData) => <TouchableHighlight onPress={()=>this._onDocSelected(rowData)}><Text>{rowData}</Text></TouchableHighlight>}
                enableEmptySections={true}
              />
            </View>
            /* jshint ignore: end */
        );
    }
}