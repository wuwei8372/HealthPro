import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../db/db';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Nutrition',
  };

  constructor(props) {
    super(props);
    this.state = {
      //tableHead: ['Name', 'Price', 'Description', 'Link'],
      data: []
    };
  }

  //componentWillMount() {
  //  this.fetchData();
  //}


  getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {

      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

  componentDidMount() {

        this.setState({
          data: []
        });

  };
  //var count=0;

  checkNut =() =>{
      //count += 1;
  }

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
        <View style={styles.regform}>
            <Text style={styles.header}> Nutrition Check</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}

            <TextInput style={styles.TextInput} placeholder="Nutrition" onChangeText={email => this.setState({ email })}
            />

            <Button title="Check Nutrition" onPress={this.setState = ({
              data: this.getMoviesFromApiAsync
            })} />

        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />

        <Text style={styles.header}>button pressed</Text>}


          /*data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <Text>
              {`${item.name.first} ${item.name.last}`}
            </Text>}*/

      </View>






    /*  <View style={styles.container}>
        <View style={styles.regform}>

      <TextInput style={styles.TextInput} placeholder="Food Info" onChangeText={email => this.setState({ email })}
    value={"value!!!"}/>
    <TextInput style={styles.TextInput} placeholder="Food Info" onChangeText={email => this.setState({ email })}
  value={"2nd input!!!"}/>

      </View>
    </View>*/
      //<Button title="Check Current Nutrition" onclick={this.checkNut} />

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
