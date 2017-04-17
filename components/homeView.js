import React, { Component } from 'react';
import { Text,  View} from 'react-native';
import LinkBlock from './linkBlock';

export default class HomeView extends Component {
   
    render() {
        return (
            /* jshint ignore: start */
            <View style={{flex:1}}>
                <LinkBlock navigator = {this.props.navigator} routes = {this.props.routes} style={{flex:1}} color="powderblue" dest="1" text="+ Create New"/>
                <LinkBlock navigator = {this.props.navigator} routes = {this.props.routes} style={{flex:1}} color="skyblue" dest="2" text="-> My Studio"/>
                <LinkBlock navigator = {this.props.navigator} routes = {this.props.routes} style={{flex:1}} color="steelblue" dest="3"/>
            </View>
            /* jshint ignore: end */
        );
    }
}
