import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { db } from '../db/db';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);
    this.state = {
      productList: [{
        name: 'product1',
        price: '100',
        description: 'I am a description'
      },
      {
        name: 'product2',
        price: '200',
        description: 'I am a description'
      }
    ]
    };
  }

  componentDidMount() {
    let products = db.ref('/products');

    products.on('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        let items = Object.values(data);
        // console.log(items);
        var list = [];
        items.map((item, index) => {
            console.log(item.name);
            list.push({
              name: item.name,
              price: item.price,
              description: item.description
            });
        });
        this.setState({
          productList: list
        });
     });
}

  render() {
    return (
      <View>
        {this.state.productList.map(({ name, price, description }, i) => (
        <View key={i}>
            <Text >{name}</Text>
            <Text >{price}</Text>
            <Text >{description}</Text>
        </View>
        ))}
      </View>
    )
  }
}
