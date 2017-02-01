import React, { Component } from 'react';
import {
  View
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

// **Note** Equivalent syntax the below is < es6
// const FBSDK = require('react-native-fbsdk');
//
// const {
//   LoginButton,
//   AccessToken
// } = FBSDK;

class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert(`Login failed with error: ${result.error}`);
              } else if (result.isCancelled) {
                alert('Login was cancelled');
              } else {
                alert(`Login was successful with permissions: ${result.grantedPermissions}`);
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString());
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>
    );
  }
}

module.exports = Login;
