import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Text, Tab} from 'native-base';
export default class TabIconTop extends React.Component {
    render(){
        return (
            /* jshint ignore:start*/
            <Text style={this.props.selected?styles.tabFontActive:styles.tabFont}>{this.props.title}</Text>
            /* jshint ignore:end*/
        );
    }
}
const styles ={
    tabFontActive:{
        color:'#FFFFFF',
        fontWeight:'bold'
    },
    tabFont:{
        color:'#CFD8DC',
        fontWeight:'bold'
    }
}