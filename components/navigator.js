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
        return (
            /* jshint ignore: start */
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene key="main" tabs={true} initial={true} tabBarStyle={styles.tabBar}>
                            <Scene key="createNew" component={CreateNewAudio} title="新的作品" initial={true} icon={TabIcon}/>
                            <Scene key="myStudio" component={MyStudio} title="工作室" icon={TabIcon}/>
                            <Scene key="share" tabs={true} title="更多资源" icon={TabIcon} tabBarStyle={styles.tabBarTop}>
                                <Scene key="shareAudio" component={ShareMusic} title = "作品" icon={TabIcon} hideNavBar={true} />
                                <Scene key="shareDoc" component={ShareDoc} title = "文本" icon={TabIcon} hideNavBar={true} />
                                <Scene key="shareMusic" component={ShareMusic} title = "伴奏" icon={TabIcon} hideNavBar={true} />
                            </Scene>
                        </Scene>
                        <Scene key="docList" component={DocList} title="选择文本"/>
                        <Scene key="musicList" component={MusicList} title="选择伴奏"/>
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