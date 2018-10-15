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
      syndromeList: [{
      //   name: 'product1',
      //   productList: '100',
      //   description: 'I am a description'
      // },
      // {
      //   name: 'product2',
      //   productList: '200',
      //   description: 'I am a description'
      // }
      }]
    };
  }

  componentDidMount() {
    // console.log(this.props.text);
    const ref = db.ref('/syndromes');
    // console.log(this.props.navigation.getParam('text','No name'));
    ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
        let data = snapshot.val();
        // console.log(data);
        let items = Object.values(data);
        // console.log(items);
        var list = [];
        items.map((item, index) => {
            // console.log(item.name);
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
            <Text >{name}</Text>
            <Text >{description}</Text>
            <Text >{productList}</Text>
        </View>
        ))}
      </View>
    )
  }
}
