import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { db } from '../db/db';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  constructor(props) {
    super(props);
    this.state = {
      syndromeList: []
    };
  }

  // componentDidMount() {
  //   // console.log(this.props.text);
  //   const ref = db.ref('/syndromes');
  //   // console.log(this.props.navigation.getParam('text','No name'));
  //   ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
  //       let data = snapshot.val();
  //       // console.log(data);
  //       let items = Object.values(data);
  //       // console.log(items);
  //       var list = [];
  //       items.map((item, index) => {
  //           // console.log(item.name);
  //           list.push({
  //             name: item.name,
  //             productList: item.productList,
  //             description: item.description
  //           });
  //       });
  //       this.setState({
  //         syndromeList: list
  //       });
  //    });
// }
componentDidUpdate(prevProps) {
  if(prevProps.navigation.getParam('text', 'No name') !== this.props.navigation.getParam('text','No name')) {
    const ref = db.ref('/syndromes');
    ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        let items = Object.values(data);
        var list = [];
        items.map((item, index) => {
            list.push({
              name: item.name,
              productList: item.productList,
              description: item.description
            });
        });
        this.setState({
          syndromeList: list
        });
     });
  }
}

componentDidMount() {
  const ref = db.ref('/syndromes');
  ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
      let data = snapshot.val();
      console.log(data);
      let items = Object.values(data);
      // console.log(items);
      var list = [];
      items.map((item, index) => {
          list.push({
            name: item.name,
            productList: item.productList,
            description: item.description
          });
      });
      this.setState({
        syndromeList: list
      });
   });
}

  render() {
    return (
      <View>
        {this.state.syndromeList.map(({ name, productList, description }, i) => (
        <View key={i}>
            <Text >Syndrome name: {name}</Text>
            <Text >Syndrome description: {description}</Text>
            <Text >Related products list: {productList}</Text>
        </View>
        ))}
      </View>
    )
  }
}
