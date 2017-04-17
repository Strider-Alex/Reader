/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppNavigator from "./components/navigator";
export default class AwesomeProject extends Component {
  render() {
    return (
      /* jshint ignore: start */
      <View style={styles.container}>
        <AppNavigator/>
      </View>
      /* jshint ignore: end */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
