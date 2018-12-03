import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  //Button,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { db } from '../db/db';
import { MonoText } from '../components/StyledText';
import Firebase from 'firebase';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';

import { LinksStack } from '../navigation/MainTabNavigator';

import AwesomeButton from 'react-native-really-awesome-button';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: 'this is a test',
      currentUser: null
    };
  }


  onButtonPress(link) {
    const { navigate } = this.props.navigation;
    navigate(link, {text: this.state.text});
  }
  

  componentDidMount() {

    // Firebase.auth().onAuthStateChanged(user => {
    //   this.props.navigation.navigate(user ? 'Home' : 'Login')
    // })
    const { currentUser } = Firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state;

    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style = {styles.regform}>
            <FormLabel>Please enter product name or syndrome name</FormLabel>
            <FormInput
              placeholder="name"
              onChangeText={(value) => this.setState({text: value})}
            />
            <View style = {styles.awesomeButton}>
            <AwesomeButton
                backgroundColor="#ADFF2F"

                onPress={()=>this.onButtonPress.bind(this)("Links")}
                >
                <Text>Search by product name</Text>
            </AwesomeButton>


            <AwesomeButton
                backgroundColor="#ADFF2F"
                onPress={()=>this.onButtonPress.bind(this)("Settings")}
                >
                <Text>Search by symptom name</Text>
            </AwesomeButton>

            <Text style = {{width: 150, height: 30, backgroundColor: 'powderblue'}}>
              Hi {currentUser && currentUser.email}!

            </Text>
            <Text style = {{width: 300, height: 30}}>
              This is your most frequently searched items:
            </Text>
            <AwesomeButton
                backgroundColor="#91d6f2"
                onPress={()=>{
                  const { navigate } = this.props.navigation;
                  navigate("Links", {text: 'Calcium'});
                  }
                }
                >

                <Text>Calcium</Text>
            </AwesomeButton>
            <AwesomeButton
                backgroundColor="#91d6f2"
                onPress={()=>{
                  const { navigate } = this.props.navigation;
                  navigate("Links", {text: 'Fish oil'});
                  }
                }
                >

                <Text>Fish oil</Text>
            </AwesomeButton>
            <AwesomeButton
                backgroundColor="#91d6f2"
                onPress={()=>{
                  const { navigate } = this.props.navigation;
                  navigate("Links", {text: 'Cough'});
                  }
                }
                >

                <Text>Cough</Text>
            </AwesomeButton>
            <AwesomeButton
                backgroundColor="#91d6f2"
                onPress={()=>{
                  const { navigate } = this.props.navigation;
                  navigate("Links", {text: 'Vitamin D'});
                  }
                }
                >
                <Text>Vitamin D</Text>
            </AwesomeButton><AwesomeButton
                backgroundColor="#91d6f2"
                onPress={()=>{
                  const { navigate } = this.props.navigation;
                  navigate("Links", {text: 'Vitamin C'});
                  }
                }
                >
                <Text>Vitamin C</Text>
            </AwesomeButton>

            </View>
        </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          {/* <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View> */}
        </View>

        {/* <View style = {styles.container1}>


          <TouchableHighlight onPress={() => this.onButtonPress.bind(this)("Login")} style = {styles.button} underlayColor = '#99d9f4'>
            <Text style = {styles.buttonText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={()=>this.onButtonPress.bind(this)("Register")} style = {styles.button} underlayColor = '#99d9f4' >
            <Text style = {styles.buttonText}>Register</Text>
          </TouchableHighlight>
        </View> */}

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttonText: {
    fontSize:18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height:40,
    backgroundColor: '#2e78b7',
    borderColor: '#2e78b7',
    marginLeft: 10,
    width: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  container1: {
    //alignSelf: 'stretch',
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  regform: {
    alignSelf: 'stretch',
  },
  awesomeButton:{
    width: 50,
    alignSelf: 'center',
    //justifyContent: 'center',
    alignItems: 'center',

  }
});
