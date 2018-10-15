import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  //Button,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { db } from '../db/db';
import { MonoText } from '../components/StyledText';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';

import { LinksStack } from '../navigation/MainTabNavigator';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {text: 'this is a test'};    
  }

  
  onButtonPress(link) {
    const { navigate } = this.props.navigation;
    navigate(link, {text: this.state.text});
  }

  render() {
    
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View>
            <FormLabel>Please enter product name or syndrome name</FormLabel>
            <FormInput 
              placeholder="name"
              onChangeText={(value) => this.setState({text: value})}
            />

            <Button
              style={styles.buttonStyle}
              medium
              backgroundColor='blue'
              color='white'
              title='Search by product name' 
              onPress={()=>this.onButtonPress.bind(this)("Links")} />
            <View/>
              
            <Button
              medium
              backgroundColor='blue'
              color='white'
              title='Search by syndrome name' 
              onPress={()=>this.onButtonPress.bind(this)("Settings")} />
          </View>

        <Text> </Text>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          {/* <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View> */}
        </View>
          
        <View style = {styles.container1}>
          <TouchableHighlight onPress={() => this.onButtonPress.bind(this)("Register")} style = {styles.button} underlayColor = '#99d9f4'>
            <Text style = {styles.buttonText}>Login</Text>
            {/* <Button onPress={() => {Alert.alert('You tapped the button!');}} /> */}
          </TouchableHighlight>

          <TouchableHighlight onPress={()=>this.onButtonPress.bind(this)("Register")} style = {styles.button} underlayColor = '#99d9f4' >
            <Text style = {styles.buttonText}>Register</Text>
          </TouchableHighlight> 
        </View>

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
  }
});
