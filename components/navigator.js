import React, { Component } from 'react';
import {Navigator, TouchableHighlight, StyleSheet } from 'react-native';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
import MusicList from './musicList';
import ShareAudio from './shareAudio';
import ShareMusic from './shareMusic';
import ShareDoc from './shareDoc';
import TabIcon from './tabIcon';
import TabIconTop from './tabIconTop';
import Collection from './collection';
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
                            <Scene key="createNew" component={CreateNewAudio} title="新的作品" initial={true} icon={TabIcon} iconName="md-add-circle"/>
                            <Scene key="myStudio" component={MyStudio} title="工作室" icon={TabIcon} iconName="md-flask"/>
                            <Scene key="collection" component={Collection} title="我的收藏" icon={TabIcon} iconName="md-folder-open"/>
                            <Scene key="share" tabs={true} title="分享" icon={TabIcon} tabBarStyle={styles.tabBarTop} iconName="md-cloud">
                                <Scene key="shareAudio" component={ShareAudio} title = "作品" icon={TabIconTop} hideNavBar={true} />
                                <Scene key="shareDoc" component={ShareDoc} title = "文本" icon={TabIconTop} hideNavBar={true} />
                                <Scene key="shareMusic" component={ShareMusic} title = "伴奏" icon={TabIconTop} hideNavBar={true} />
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
        top:0
    }
})