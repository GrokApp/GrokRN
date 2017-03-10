import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { CardSection, Button } from './common';

class Registration extends Component {

  onGetStartedPress() {

  }

  onLoginPress() {

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.imageStyle}>
          <Image
            source={require('./img/grok.png')}
          />
        </View>
        <View style={{ justifyContent: 'flex-end', flex: 0.5 }}>
          <CardSection>
            <Button onPress={this.onGetStartedPress.bind(this)}>
              Get Started
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onLoginPress.bind(this)}>
              Login
            </Button>
          </CardSection>
        </View>
      </View>
    );
  }
}

const styles = {
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5
  },
  buttonsStyle: {
    justifyContent: 'flex-end'
  },
  registrationStyle: {
    justifyContent: 'flex-end'
  }
};

export default Registration;
