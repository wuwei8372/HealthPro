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
      productList: []
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const ref = db.ref('/products');
  //   console.log(nextProps.navigation.getParam('text','No name'));
  //   ref.orderByChild('name').equalTo(nextProps.navigation.getParam('text','No name')).on('value', (snapshot) => {
  //       let data = snapshot.val();
  //       console.log(data);
  //       let items = Object.values(data);
  //       // console.log(items);
  //       var list = [];
  //       items.map((item, index) => {
  //           list.push({
  //             name: item.name,
  //             price: item.price,
  //             description: item.description
  //           });
  //       });
  //       this.setState({
  //         productList: list
  //       });
  //    });
  // }

  componentDidUpdate(prevProps) {
    if(prevProps.navigation.getParam('text', 'No name') !== this.props.navigation.getParam('text','No name')) {
      const ref = db.ref('/products');
      ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
          let data = snapshot.val();
          console.log(data);
          let items = Object.values(data);
          var list = [];
          items.map((item, index) => {
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
  }

  componentDidMount() {
    const ref = db.ref('/products');
    ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        let items = Object.values(data);
        // console.log(items);
        var list = [];
        items.map((item, index) => {
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
