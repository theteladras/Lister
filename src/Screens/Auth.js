import React, { Component } from 'react';
import {
  Button,
  Image,
  Platform,
  Keyboard,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';


export default class Auth extends Component {
  state={ email: '', password: '', hidePw: true };

  renderEye() {
    return (
      <Icon name="eye" size={18} color="#333" />
    );
  }
  renderCrossEye() {
    return (
      <Icon name="eye-slash" size={18} color="#333" />
    );
  }

  loginBtn() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => { console.log(res);  Actions.home({  }); })
      .catch( (e) => console.log(e) );
  }

  render() {
    return (
      <View style={{ width: '90%', alignSelf: 'center', flex: 0.8, justifyContent: 'center', }}>
        <StatusBar
          backgroundColor="#50aa50"
          barStyle="light-content"
        />
      <Image source={require('../Resource/lister_logo.png')} style={{ width: '50%', resizeMode: 'contain', alignSelf: 'center' }} />
        <TextInput placeholder="e-mail"
          value = {this.state.email}
          onChangeText = { (email) => { this.setState({ email }) } }
          />
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TextInput placeholder="password"
            value = {this.state.password}
            onChangeText = { (password) => { this.setState({ password }) } }
            secureTextEntry={this.state.hidePw}
            style={{ width: '100%' }}
            />
          <View style={{ left: -30, bottom: -14 }}>
            <TouchableOpacity onPress={() => { this.setState({ hidePw: !this.state.hidePw }) }}>
              {this.state.hidePw == true ? this.renderEye() : this.renderCrossEye() }
            </TouchableOpacity>
          </View>
      </View>
        <View style={{ marginBottom: 20 }} >
          <Button title="Log In" color="#40Af60" onPress={this.loginBtn.bind(this)} />
        </View>
        <View style={{ width: '50%', alignSelf: 'center' }}>
          <Button title="Sign In" color="#4080B5" onPress={Actions.signup} />
        </View>
      </View>
    );
  }
}
