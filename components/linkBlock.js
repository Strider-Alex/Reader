import React, { Component } from 'react';
import {View,  TouchableHighlight } from 'react-native';
import {Text,Button } from 'native-base';

export default class LinkBlock extends Component {
    _onPress(){
        this.props.navigator.push(this.props.routes[this.props.dest]);
    }
    render() {
        return (
            /* jshint ignore: start */
            <Button block style={{height:100,marginVertical:10,marginHorizontal:10,backgroundColor:this.props.color}} onPress={()=>this._onPress()}><Text>{this.props.text}</Text></Button>
            /* jshint ignore: end */
        );
    }
}