import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
 } from 'react-native';
 import Firebase from 'firebase';
//import { ExpoLinksView } from '@expo/samples';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Registration extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  static navigationOptions = {
    title: 'Login',
  };

  handleLogin = () => {
    const { email, password } = this.state
    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.regform}>
            <Text style={styles.header}> Login</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
            {/* <TextInput style={styles.TextInput} placeholder="Your name" /> */}
            <TextInput style={styles.TextInput} placeholder="Your email" onChangeText={email => this.setState({ email })}
          value={this.state.email}/>
            <TextInput style={styles.TextInput} placeholder="Your password" onChangeText={password => this.setState({ password })}
          value={this.state.password}/>

          <AwesomeButton
              backgroundColor="#ADD8E6"
              textColor = "#FFFFFF"
              onPress={this.handleLogin}
              >
              <Text>Login</Text>
          </AwesomeButton>

          <AwesomeButton
              backgroundColor="#ADD8E6"
              textColor = "#FFFFFF"
              onPress={() => this.props.navigation.navigate('Register')}
              >
              <Text textColor="#FFFFFF">Don't have an account?Sign Up</Text>
          </AwesomeButton>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#36485f',
    backgroundColor: '#e0eaf9',
    paddingLeft: 60,
    paddingRight: 60,
  },
  regform: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#0c1016',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  TextInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#000000',
    borderBottomColor: '#000000',
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
