import React, { Component } from 'react';
import {View} from 'react-native';
import LinkBlock from './linkBlock';
import { Footer, FooterTab, Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
export default class HomeView extends Component {
   
    render() {
        return (
            /* jshint ignore: start */
             <Container style={{marginTop:100}}>
                <Content>
                    
                        <LinkBlock navigator = {this.props.navigator} routes = {this.props.routes} color="powderblue" dest="1" text="+ Create New"/>
                        <LinkBlock navigator = {this.props.navigator} routes = {this.props.routes} color="skyblue" dest="2" text="-> My Studio"/>
                        <LinkBlock navigator = {this.props.navigator} routes = {this.props.routes} color="steelblue" dest="3"/>
                   
                </Content>
            </Container>
            
            /* jshint ignore: end */
        );
    }
}
