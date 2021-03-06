import React, { Component } from 'react';
import {Navigator, TouchableHighlight, StyleSheet } from 'react-native';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
import MusicList from './musicList';
import Share from './share';
import AudioPage from './audioPage';
import DocPage from './docPage';
import MusicPage from './musicPage';
import SimpleList from './simpleList';
import SimpleAudioPage from './simpleAudioPage';
import Activity from './activity';
import TabIcon from './tabIcon';
import userCenter from './userCenter';
import Login from './login';
import CommentPage from './comment';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Scene, Router, TabBar, Modal, ActionConst } from 'react-native-router-flux';

export default class AppNavigator extends Component {
    render() {
        return (
            /* jshint ignore: start */
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBar}>
                            <Scene key="share" component={Share} title="发现颂客" icon={TabIcon} initial={true} iconName="md-compass" hideNavBar={true}/>
                            <Scene key="myStudio" component={MyStudio} title="工作室" icon={TabIcon} iconName="md-flask" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}/>
                            <Scene key="activity" component={Activity} title="颂客活动" icon={TabIcon} iconName="md-cafe" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}/>
                            <Scene key="userCenter" component={userCenter} title="用户中心" icon={TabIcon} iconName="md-person" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}/>
                        </Scene>
                        <Scene key="createNew" component={CreateNewAudio} title="新的作品" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="docList" component={DocList} title="选择文本" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="musicList" component={MusicList} title="选择伴奏" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="audioPage" component={AudioPage} title="作品详情" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="docPage" component={DocPage} title="文段详情" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="musicPage" component={MusicPage} title="伴奏详情" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="simpleList" component={SimpleList} title="工作室列表" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="simpleAudioPage" component={SimpleAudioPage} title="草稿详情" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="comment" component={CommentPage} title="评论" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene  key="extra" initial={true} >
                            <Scene key="login" component={Login} title="登录" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle} hideNavBar/>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
            /* jshint ignore: end */
        );
    }
}

const styles = StyleSheet.create({
    backButton:{
        tintColor:'#FFFFFF'
    },
    navTitle:{
        color:'#FFFFFF'
    },
    navBar:{
        backgroundColor:'#00BF9A'
    },
    tabBar:{
        backgroundColor:'#00BF9A'
    }
})