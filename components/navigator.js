import React, { Component } from 'react';
import {Navigator, TouchableHighlight, StyleSheet } from 'react-native';
import HomeView from './homeView';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
import MusicList from './musicList';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
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
            <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            style={{flex:1}}
            renderScene={(route, navigator) =>{
                switch(route.index){
                    case 0:
                        return <HomeView navigator={navigator} routes={routes}/>
                        break;
                    case 1:
                        return <CreateNewAudio navigator={navigator} routes={routes} doc={this.state.doc} music={this.state.music}/>
                        break;
                    case 2:
                        return <MyStudio navigator={navigator} routes={routes}/>
                        break;
                    case 3:
                        return <DocList navigator={navigator} routes={routes} onStateChange={(newState)=>this._onStateChange(newState)}/>
                        break;
                    case 4:
                        return <MusicList navigator={navigator} routes={routes} onStateChange={(newState)=>this._onStateChange(newState)}/>
                        break;
                    default:
                        return <Text>Hello {route.title}!</Text> 
                }
            }}
            navigationBar={
                <Navigator.NavigationBar
                    routeMapper={{
                        LeftButton: (route, navigator, index, navState) =>
                        { if (route.index === 0) {
                            return null;
                            } else {
                                return (
                                    <Button transparent onPress={() => navigator.pop()}>
                                        <Icon name='arrow-back' />
                                    </Button>
                                );
                            }
                        },
                        RightButton: (route, navigator, index, navState) =>
                        { return (<Text></Text>); },
                        Title: (route, navigator, index, navState) =>
                        { return (<Title style={{fontSize:23,paddingTop:10}}>Awesome Reader</Title>); },
                    }}
                    style={styles.navibar}
                />
            }
            />
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