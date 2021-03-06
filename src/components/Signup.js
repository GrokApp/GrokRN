import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

const t = require('tcomb-form-native');

const STORAGE_KEY = 'id_token';

const Form = t.form.Form;

const Person = t.struct({
  username: t.String,
  password: t.String
});

const options = {};

class Signup extends Component {

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  }

  async _getProtectedQuote() {
    const DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    fetch('http://localhost:3001/api/protected/random-quote', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${DEMO_TOKEN}`
      }
    })
    .then((response) => response.text())
    .then((quote) => {
      AlertIOS.alert(
        'Dario Rethage Quote:', quote);
    })
    .done();
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert('Logout Success!');
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  }

  _userSignup() {
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        this._onValueChange(STORAGE_KEY, responseData.id_token);
        AlertIOS.alert(
          'Signup Success!',
          'Click the button to get a Dario Rethage quote!'
        );
      })
      .done();
    }
  }

  _userLogin() {
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      fetch('http://localhost:3001/sessions/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        AlertIOS.alert(
          'Login Success!',
          'Click the button to get a Dario Rethage quote!'
        );
        this._onValueChange(STORAGE_KEY, responseData.id_token);
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Signup/Login below for Dario Rethage Quotes!</Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.button}
            onPress={this._userSignup}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this._userLogin}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this._userLogout}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={this._getProtectedQuote} style={styles.button}>
            <Text style={styles.buttonText}>Get a Dario Rethage Quote!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = Signup;
