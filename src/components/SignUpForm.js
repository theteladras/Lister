import React, { Component } from 'react';
import { View, TextInput, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


export default class SignUpForm extends Component {
  state = { email: '', password: '', hidePw: true };

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

  signBtn() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then( (res) => { console.log(res); Actions.login(); this.setState({ email: '', password: '', error: false }); })
      .catch( (e) => { console.log(e); this.setState({ email: '', password: '', error: true }); });
  }

  render() {
    return (
      <View style={{ width: '80%', alignSelf: 'center', paddingTop: 50 }}>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TextInput placeholder="email"
            value = {this.state.email}
            onChangeText = { (email) => { this.setState({ email }) } }
            style={{ width: '100%' }}
          />
        </View>
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
        <Button title="Sign" color="#4099ff" onPress={ this.signBtn.bind(this) } />
      </View>
    );
  }
}
