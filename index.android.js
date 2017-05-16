/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import AppNavigator from "./components/navigator";
export default class AwesomeProject extends Component {
  render() {
    return (
      /* jshint ignore: start */
      <AppNavigator/>
      /* jshint ignore: end */
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
