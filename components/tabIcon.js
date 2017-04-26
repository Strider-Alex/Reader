import React, { Component } from 'react';
import { Text, Icon,Container,Body,Content} from 'native-base';
export default class TabIcon extends React.Component {
    render(){
        return (
            /* jshint ignore:start*/
            <Container style={{alignItems:'center',justifyContent:'center'}} >
            {(this.props.iconName)?<Icon name={this.props.iconName} style={{color: this.props.selected ? '#007AFF' :'#999999'}}/>:undefined}
            <Text style={{color: this.props.selected ? '#007AFF' :'#999999',fontSize:10}}>{this.props.title}</Text>
            </Container>
            /* jshint ignore:end*/
        );
    }
}