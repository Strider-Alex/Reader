import React, { Component } from 'react';
import { Text, Navigator, TouchableHighlight } from 'react-native';
import HomeView from './homeView';
import CreateNewAudio from './createNewAudio';
import MyStudio from './myStudio';
import DocList from './docList';
export default class AppNavigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            doc:'No doc selected',
            music: 'No music selected'
        }
    }
    _onStateChange(newState){
        console.log("State:"+newState);
        this.setState(newState);
    }
    render() {
        const routes = [
            {title: 'Home', index: 0},
            {title: 'Create New', index: 1},
            {title: 'My Studio', index: 2},
            {title: 'Doc List', index: 3}
        ];
        return (
            /* jshint ignore: start */
            <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
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
                        return <DocList navigator={navigator} routes={routes} onStateChange={()=>this._onStateChange}/>
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
                                    <TouchableHighlight onPress={() => navigator.pop()}>
                                        <Text>Back</Text>
                                    </TouchableHighlight>
                                );
                            }
                        },
                        RightButton: (route, navigator, index, navState) =>
                        { return (<Text>Done</Text>); },
                        Title: (route, navigator, index, navState) =>
                        { return (<Text>Awesome Nav Bar</Text>); },
                    }}
                    style={{backgroundColor: 'gray'}}
                />
            }
            style={{paddingTop: 60}}
            />
            /* jshint ignore: end */
        );
    }
}