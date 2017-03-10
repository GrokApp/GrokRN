import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import Registration from './components/Registration';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Grok" />
        <Registration />
      </View>
    );
  }
}

export default App;
