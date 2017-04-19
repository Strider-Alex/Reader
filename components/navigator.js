import React, { Component } from 'react';
import {Navigator, TouchableHighlight, StyleSheet } from 'react-native';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
import MusicList from './musicList';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Scene, Router} from 'react-native-router-flux';
export default class AppNavigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            doc:undefined,
            music: undefined
        }
    }
    _onStateChange(newState){
        this.setState(newState);
    }
    render() {
        const routes = [
            {title: 'Home', index: 0},
            {title: 'Create New', index: 1},
            {title: 'My Studio', index: 2},
            {title: 'Doc List', index: 3},
            {title: 'Music List', index: 4}
        ];
        return (
            /* jshint ignore: start */
            <Router>
                <Scene key="root">
                    <Scene key="createNew" component={CreateNewAudio} title="Create New" initial={true}/>
                    <Scene key="myStudio" component={MyStudio} title="My Studio"/>
                    <Scene key="docList" component={DocList} title="Doc List"/>
                    <Scene key="musicList" component={MusicList} title="Music List"/>
                </Scene>
            </Router>
            /* jshint ignore: end */
        );
    }
}

const styles = StyleSheet.create({
    navibar:{
        backgroundColor: '#81c04d',
        paddingTop: 12,
        paddingBottom: 10,
        flex:1
    }
})