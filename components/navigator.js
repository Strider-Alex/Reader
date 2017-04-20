import React, { Component } from 'react';
import {Navigator, TouchableHighlight, StyleSheet } from 'react-native';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
import MusicList from './musicList';
import ShareMusic from './shareMusic';
import ShareDoc from './shareDoc';
import TabIcon from './tabIcon';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Scene, Router, TabBar, Modal, ActionConst } from 'react-native-router-flux';

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
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene key="main" tabs={true} initial={true} tabBarStyle={styles.tabBar}>
                            <Scene key="createNew" component={CreateNewAudio} title="Create New" initial={true} icon={TabIcon}/>
                            <Scene key="myStudio" component={MyStudio} title="My Studio" icon={TabIcon}/>
                            <Scene key="share" tabs={true} title="Share" icon={TabIcon} tabBarStyle={styles.tabBarTop}>
                                <Scene key="shareAudio" component={ShareMusic} title = "Audio" icon={TabIcon} hideNavBar={true} />
                                <Scene key="shareDoc" component={ShareDoc} title = "Doc" icon={TabIcon} hideNavBar={true} />
                                <Scene key="shareMusic" component={ShareMusic} title = "Music" icon={TabIcon} hideNavBar={true} />
                            </Scene>
                        </Scene>
                        <Scene key="docList" component={DocList} title="Doc List"/>
                        <Scene key="musicList" component={MusicList} title="Music List"/>
                    </Scene>
                </Scene>
            </Router>
            /* jshint ignore: end */
        );
    }
}

const styles = StyleSheet.create({
    tabBar:{
        backgroundColor:'#EFEFF2'
    },
    tabBarTop:{
        backgroundColor:'#3399FF',
        top:0
    }
})