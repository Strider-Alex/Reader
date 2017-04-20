import React, { Component } from 'react';
import { View,Text} from 'react-native';
export default class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? '#007AFF' :'#999999',fontWeight:'bold',fontSize:16}}>{this.props.title}</Text>
        );
    }
}