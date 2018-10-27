import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  button,
  Alert,
 } from 'react-native';
//import { ExpoLinksView } from '@expo/samples';

export default class Registration extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.regform}>
            <Text style={styles.header}> Login</Text>
            {/* <TextInput style={styles.TextInput} placeholder="Your name" /> */}
            <TextInput style={styles.TextInput} placeholder="Your email" />
            <TextInput style={styles.TextInput} placeholder="Your password" />
            <TouchableOpacity style={styles.button} onPress={() => {Alert.alert('You tapped the Login button!');}}> 
              <Text style={styles.btntxt}>Log in</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  regform: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  TextInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  Button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    //backgroundColor: 'blue',
    marginTop: 30, 
  },
  btntxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
