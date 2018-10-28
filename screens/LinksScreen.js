import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { db } from '../db/db';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// const Ebay = require('../src/index');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Price', 'Description', 'Link'],
      productList: []
    };

    fetch("https://arcane-river-25232.herokuapp.com/vitamin D").then(function(response){return response.json()})
    .then(data=> {
      this.setState({productList:data[0].searchResult[0].item});
      // console.log(data);
    });

    // let ebay = new eBay({
    //   clientID: "YizhangX-HealthPr-PRD-a7f47136f-a03cc9e2",
    //   limit: 6
    // });
    // ebay.findItemsByKeywords("vitamin D").then((data) => {
    //   console.log("result: ",JSON.stringify(data[0].searchResult[0]["item"][0]));
    //   // console.log("Pagination Output: ", data[0].paginationOutput);
    //   var products = data[0].searchResult[0]["item"];
      // this.setState({productList:products});
    // }, (error) => {
    //   console.log(error);
    // });
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

  // componentDidUpdate(prevProps) {
  //   if(prevProps.navigation.getParam('text', 'No name') !== this.props.navigation.getParam('text','No name')) {
  //     const ref = db.ref('/products');
  //     ref.orderByChild('name').equalTo(this.props.navigation.getParam('text','No name')).on('value', (snapshot) => {
  //         let data = snapshot.val();
  //         console.log(data);
  //         let items = Object.values(data);
  //         var list = [];
  //         items.map((item, index) => {
  //             list.push({
  //               name: item.name,
  //               price: item.price,
  //               description: item.description
  //             });
  //         });
  //         this.setState({
  //           productList: list
  //         });
  //      });
  //   }
  // }

  // componentDidMount() {
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
    console.log(this.state.productList);
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
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
