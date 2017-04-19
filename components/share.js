import React, { Component } from 'react';
import { WebView} from 'react-native';
export default class Share extends Component {
    render(){
        /*jshint ignore:start*/
        return(
            <WebView
                source={{uri: 'http://reader.strider.site:3000'}}
                style={{marginTop: 20}}
            />
        );
        /*jshint ignore:end*/
    }
}