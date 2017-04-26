import React, { Component } from 'react';
import { Text, Icon,Container,Body,Content} from 'native-base';
export default class TabIconTop extends React.Component {
    render(){
        return (
            /* jshint ignore:start*/
            <Text style={{color: this.props.selected ? '#007AFF' :'#999999',fontWeight:'bold'}}>{this.props.title}</Text>
            /* jshint ignore:end*/
        );
    }
}