import React, { Component } from 'react';
import { Text,  View,  TouchableHighlight } from 'react-native';

export default class LinkBlock extends Component {
    _onPress(){
        this.props.navigator.push(this.props.routes[this.props.dest]);
    }
    render() {
        return (
            /* jshint ignore: start */
            <TouchableHighlight onPress = {()=>this._onPress()} style={{flex:1}}>
                <View style={{backgroundColor:this.props.color,flex:1,flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:26}} >{this.props.text}</Text>
                </View>
            </TouchableHighlight>
            /* jshint ignore: end */
        );
    }
}