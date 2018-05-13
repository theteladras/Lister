import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Toolbar extends Component {

  renderLogOut() {
    return(
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => {
          Actions.auth();
        }}>
          <Text style={{ fontWeight: '100' }}>Log out</Text>
        </TouchableOpacity>
    </View>
    );
  }

  renderBackBtn() {
    return(
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => {
          Actions.pop();
        }}>
          <Text style={{ fontWeight: '100' }}>Back</Text>
        </TouchableOpacity>
    </View>
    );
  }

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={ this.props.toolColor}
          barStyle="light-content"
        />
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>
            {this.props.title}
          </Text>
          { this.props.back == 1 ? this.renderBackBtn() : undefined }
          { this.props.flag == 1 ? this.renderLogOut() : undefined }
        </View>

      </View>
    );
  }
}

const styles = {
  navBar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row',
  },
  navBarTitle: {
    color: '#4fa155',
    fontSize: 18,
    fontWeight: '500',
  },
  toolbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  logout: {
    position: 'absolute',
    right: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
  }

}
