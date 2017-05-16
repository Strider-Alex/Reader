import React, { Component } from 'react';
import {Navigator, TouchableHighlight, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
import MusicList from './musicList';
import Share from './share';
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
    componentDidMount() {
        SplashScreen.hide();
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
                            <Scene key="share" component={Share} title="发现颂客" icon={TabIcon} initial={true} iconName="md-compass" hideNavBar={true}/>
                           
                            <Scene key="myStudio" component={MyStudio} title="工作室" icon={TabIcon} iconName="md-flask" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}/>
                            <Scene key="collection" component={Collection} title="我的收藏" icon={TabIcon} iconName="md-folder-open" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}/>
                        </Scene>
                        <Scene key="createNew" component={CreateNewAudio} title="新的作品" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="docList" component={DocList} title="选择文本" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
                        <Scene key="musicList" component={MusicList} title="选择伴奏" navigationBarStyle={styles.navBar} leftButtonIconStyle={styles.backButton} titleStyle={styles.navTitle}/>
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