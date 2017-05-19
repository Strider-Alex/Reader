/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from "./components/navigator";

export default class AwesomeProject extends Component {
  componentDidMount() {
        SplashScreen.hide();
  }
  componentWillMount(){

  }
  render() {
    return (
      /* jshint ignore: start */
      <AppNavigator/>
      /* jshint ignore: end */
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
