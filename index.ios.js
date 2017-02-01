import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import Main from './App/Components/Main';

const t = require('tcomb-form-native');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

export default class GrokRN extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Grok',
          component: Main
        }}
      />
    );
  }
}

AppRegistry.registerComponent('GrokRN', () => GrokRN);
