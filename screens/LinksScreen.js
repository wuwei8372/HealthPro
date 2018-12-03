import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { db } from '../db/db';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AwesomeButton from 'react-native-really-awesome-button';
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Product Search',
  };

  constructor(props) {
    super(props);
    
    this.state = {
      tableHead: ['Name', 'Price', 'Description', 'Link'],
      text: this.props.navigation.getParam('text','Please enter search name'),
      productList: []
    };
    
    // var link = "https://arcane-river-25232.herokuapp.com/" + this.props.navigation.getParam('text','No name');
    // fetch(link).then(function(response){return response.json()})
    // .then(data=> {
    //   this.setState({productList:data[0].searchResult[0].item});
    //   // console.log(data);
    // });
  }
  search = () => {
    // console.log(this.refs.myInput.value);
    console.log(this.state.text);
    var link = "https://arcane-river-25232.herokuapp.com/" + this.state.text;
    fetch(link).then(function(response){return response.json()})
    .then(data=> {
      this.setState({productList:data[0].searchResult[0].item});
      // console.log(data);
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.navigation.getParam('text','Please enter search name')});
  }

  // componentWillReceiveProps(nextProps) {
  //   var link = "https://arcane-river-25232.herokuapp.com/" + this.props.navigation.getParam('text','No name');
  //   fetch(link).then(function(response){return response.json()})
  //   .then(data=> {
  //     this.setState({productList:data[0].searchResult[0].item});
  //     // console.log(data);
  //   });
    // const ref = db.ref('/products');
    // console.log(nextProps.navigation.getParam('text','No name'));
    // ref.orderByChild('name').equalTo(nextProps.navigation.getParam('text','No name')).on('value', (snapshot) => {
    //     let data = snapshot.val();
    //     console.log(data);
    //     let items = Object.values(data);
    //     // console.log(items);
    //     var list = [];
    //     items.map((item, index) => {
    //         list.push({
    //           name: item.name,
    //           price: item.price,
    //           description: item.description
    //         });
    //     });
    //     this.setState({
    //       productList: list
    //     });
    //  });
  // }

  // componentDidUpdate(prevProps) {
  //   var link = "https://arcane-river-25232.herokuapp.com/" + this.props.navigation.getParam('text','No name');
  //   fetch(link).then(function(response){return response.json()})
  //   .then(data=> {
  //     this.setState({productList:data[0].searchResult[0].item});
  //     // console.log(data);
  //   });
    // if(prevProps.navigation.getParam('text', 'No name') !== this.props.navigation.getParam('text','No name')) {
    //   const ref = db.ref('/products');
    //   ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
    //       let data = snapshot.val();
    //       console.log(data);
    //       let items = Object.values(data);
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
  // }

  // componentDidMount() {
  //   var link = "https://arcane-river-25232.herokuapp.com/" + this.props.navigation.getParam('text','No name');
  //   fetch(link).then(function(response){return response.json()})
  //   .then(data=> {
  //     this.setState({productList:data[0].searchResult[0].item});
  //     // console.log(data);
  //   });
  //   const ref = db.ref('/products');
  //   ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
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

  render() {
    // console.log(this.state.productList);
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Link</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      
      <View style={styles.container}>
      <AwesomeButton
              backgroundColor="#ADD8E6"
              textColor = "#FFFFFF"
              onPress={this.search}
              >
              <Text>search</Text>
          </AwesomeButton>
          <FormInput
              placeholder = 'Please enter name here'
              value = {this.props.navigation.getParam('text','No name')}
              ref="myInput"
              onChangeText={(value) => this.setState({text: value})}
            />
        <ScrollView>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {this.state.productList === undefined ? <View>Loading</View> : 
          
            this.state.productList.map((curtProduct, index) => (
              
              <TableWrapper style={styles.row} key={index}>
                <Cell data = {curtProduct.title}/>
                <Cell data = {curtProduct.sellingStatus[0].currentPrice[0]["@currencyId"]+curtProduct.sellingStatus[0].currentPrice[0]["__value__"]}/>
                <Cell data = {curtProduct.primaryCategory[0]["categoryName"][0]}/>
                <Cell data = "link"/>
              </TableWrapper>
            ))
          }
        </Table>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1', margin: 3 },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
