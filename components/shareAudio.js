import React, { Component } from 'react';
import {Container} from 'native-base';
import {WebView} from 'react-native';

export default class ShareAudioc extends Component {
    render(){
        /*jshint ignore:start*/
        return(
            <Container>
                <WebView source={{uri:'http://reader.strider.site'}} style={{marginTop:20}}/>
            </Container>
        );
        /*jshint ignore:end*/
    }
}