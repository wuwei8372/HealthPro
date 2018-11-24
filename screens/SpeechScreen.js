import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
} from 'react-native';
import Voice from 'react-native-voice';
import { Col, Row, Grid } from "react-native-easy-grid";
import AwesomeButton from 'react-native-really-awesome-button';
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }
resetResult = () => {
    this.setState({results: []});
    Voice.destroy();
}
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    console.log("I am clicked");
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
stop = () => {
    Voice.stop();
}
  
render () {
    return (
    <View>
        <Row style = {{ height: 100, top : 40}}>
        
        <View>
            <AwesomeButton
                backgroundColor="#ADD8E6"
                textColor = "#FFFFFF"
                onPress={this._startRecognition.bind(this)}
                margin="30"
                >
                <Text>Start Recognition</Text>
            </AwesomeButton>
        </View>
           
          
          <View>
            <AwesomeButton
                backgroundColor="#ADD8E6"
                textColor = "#FFFFFF"
                onPress={this.stop}
                margin="30"
                >
                <Text>Stop Recognition</Text>
            </AwesomeButton>
          </View>
         
        </Row>
        <View>
            <AwesomeButton
                backgroundColor="#ADD8E6"
                textColor = "#FFFFFF"
                onPress={this.resetResult}
                margin="30"
                >
                <Text>Reset Recognition</Text>
            </AwesomeButton>
          </View>
        
        <Row style={{ height: 100, top: 40 }}>
            <Text style={styles.transcript}>
                Recoginized text: 
            </Text>
            {this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
            )}
        </Row>

        <Row style={{ height: 100, top : 40}}>
            <AwesomeButton
              backgroundColor="#ADD8E6"
              textColor = "#FFFFFF"
              onPress={()=>{
                const { navigate } = this.props.navigation;
                navigate("Links", {text: this.state.results[0]});
                }
              }
              margin="30"
              >
              <Text>Search by product</Text>
          </AwesomeButton>
          <AwesomeButton
              backgroundColor="#ADD8E6"
              textColor = "#FFFFFF"
              onPress={()=>{
                const { navigate } = this.props.navigation;
                navigate("Settings", {text: this.state.results[0]});
                }
              }
              margin="30"
              >
              <Text>Search by Syndrome</Text>
          </AwesomeButton>
        </Row>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: 50,
  },
  container: {  padding: 16, paddingTop: 30, backgroundColor: '#fff' },
});