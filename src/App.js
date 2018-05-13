import React, { Component } from 'react';
import Router from './Router';
import firebase from 'firebase';

console.disableYellowBox = true;

export default class App extends Component {

  componentWillMount() {
    const configFirebase = {
        apiKey: "AIzaSyBetwQ_iVH6Aca1tTT3lkiLzVCJSNze098",
        authDomain: "items-49631.firebaseapp.com",
        databaseURL: "https://items-49631.firebaseio.com",
        projectId: "items-49631",
        storageBucket: "items-49631.appspot.com"
    };
    firebase.initializeApp(configFirebase);
  }

  render() {
    return (
      <Router />
    );
  }
}
