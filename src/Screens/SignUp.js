import React, { Component } from 'react';
import { View } from 'react-native';
import Form from '../components/SignUpForm';
import Toolbar from '../components/Toolbar';


export default class SignUp extends Component {
  render() {
    return (
      <View>
        <Toolbar title="Sign Up" back={true} toolColor="#20bfaa"/>
        <Form />
      </View>
    );
  }
  componentWillUnmount() {
    return (
      <Toolbar title="Sign Up" back={true} toolColor="#50aa50"/>
    );
  }
}
