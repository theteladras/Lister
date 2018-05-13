import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
} from 'react-native';


export default class BtnAdd extends Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight  underlayColor="#208871" onPress={this.props.onPress}>
          <Text style={styles.btnText}>{this.props.btnText}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  action: {
    backgroundColor: 'rgba(70,210,140,0.7)',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
}
