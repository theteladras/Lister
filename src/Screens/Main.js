import React, { Component } from 'react';
import {
  Platform,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ListView,
} from 'react-native';
import Modal from "react-native-modal";
import firebase from 'firebase';
import Toolbar from '../components/Toolbar';
import BtnAdd from '../components/BtnAdd';


export default class Main extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };

    this.itemsRef = this.getRef().child('items');
  }
  state = { modal: false, textFirst: '', deleteModal: false, titleRow: '', clickedRow: [] };



  toggleModal(x) {
    this.setState({ modal: x });
  }

  toggleSecondModal(x) {
    this.setState({ deleteModal: x });
  }

  getRef() {

    return firebase.database().ref();
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
      console.log('HERE ', currentUser);
      this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      let items = [];
      snap.forEach( (child) => {
        console.log('Here ',child);
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(items) });
    });
  }

  renderRow(item) {
    return (
      <TouchableHighlight onPress={() => this.pressRow(item) }>
        <View style={styles.list}>
          <Text style={styles.listText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  pressRow(item) {
    this.setState({ deleteModal: true, titleRow: item.title, clickedRow: item });
  }

  addToList() {
    this.toggleModal(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar title="Say it" flag={true} toolColor="#50aa50" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
        <BtnAdd btnText="Add List Content" onPress={this.addToList.bind(this)} />

        <Modal isVisible={this.state.modal}>
          <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'white', margin: 25 }}>
            <Toolbar title="Add List Item" />
            <TextInput
              value={this.state.textFirst}
              placeholder="Add to List"
              onChangeText={(value) => this.setState({textFirst: value})}
              onSubmitEditing={Keyboard.dismiss}
              style={{ marginVertical: 20 }}/>
            <View style={styles.options}>
              <TouchableOpacity onPress={() => {
                this.itemsRef.push({ title: this.state.textFirst });
                this.toggleModal(false);
              }}>
                <Text style={{ color: 'green', fontSize: 18, marginVertical: 5 }}>Save to List</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.toggleModal(false);
              }}>
                <Text style={{ color: 'blue', fontSize: 18, marginVertical: 5 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.deleteModal}>
          <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'white', margin: 25 }}>
            <Toolbar title="Delete Item from List" />
            <Text style={styles.secondModalTitle}>Delete Item</Text>
            <Text style={styles.secondModalDescription}>Are you sure you want to delete {this.state.titleRow}?</Text>
            <View style={styles.options}>
              <TouchableOpacity onPress={() => {
                this.itemsRef.child(this.state.clickedRow._key).remove();
                this.toggleSecondModal(false);
              }}>
                <Text style={{ color: 'green', fontSize: 18, marginVertical: 5}}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.toggleSecondModal(false);
              }}>
                <Text style={{ color: 'blue', fontSize: 18, marginVertical: 5 }}>No</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  componentWillUnmount() {
    this.setState({ modal: false, textFirst: '', deleteModal: false, titleRow: '', clickedRow: [] })
  }

}

const styles={
  listText: {
    color: '#333',
    backgroundColor: '#efefef'
  },
  container: {
    backgroundColor: '#efefef',
    flex: 1,
  },
  list: {
    backgroundColor: '#eee',
    borderColor: '#aeaeae',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  secondModalTitle: {
    textAlign: 'center',
    fontSize: 24,
    margin: 5,
  },
  secondModalDescription: {
    textAlign: 'center',
    fontSize: 18,
    margin: 2,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
}
