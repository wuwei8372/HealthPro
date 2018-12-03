import React from 'react';
import { Button, Image, View, Text} from 'react-native';
import { ImagePicker, Permissions, FileSystem } from 'expo';

const API_NAME = "CV_HealthPro";
const VISION_API = "c1912d3f7f1549fe8e3e3ca2c2e7d109";
const VISION_API2 = "fa935ae616ac4b15acbbf7d5f0c6bddd";
export default class ImagePickerExample extends React.Component {
    static navigationOptions = {
        title: 'Image Input',
    };
  constructor() {
    super();
    this.state = {
      image: null,
      blobImage:{},
      result: {},
      buttonText: []
    }
    this.processImage = this.processImage.bind(this);
    this.imageIdentify = this.imageIdentify.bind(this);
  }

  imageIdentify() {
    this.processImage({data: this.state.image});
  }

  async processImage(setting) {
    
    const uriBase = typeof (setting.uriBase) === 'undefined' ? "https://eastus2.api.cognitive.microsoft.com/vision/v1.0/analyze" : setting.uriBase;
    const subscriptionKey = typeof (setting.subscriptionKey) === 'undefined' ? VISION_API : setting.subscriptionKey;
    const type = typeof (setting.type) === 'undefined' ? 'blob' : setting.type;
    const visualFeatures = typeof (setting.visualFeatures) === 'undefined' ? 'Categories,Description,Color,Faces,ImageType,Color,Adult' : setting.visualFeatures;
    const details = typeof (setting.details) === 'undefined' ? 'Celebrities,Landmarks' : setting.details;
    const language = typeof (setting.language) === 'undefined' ? 'en' : setting.language;
    const data = setting.data;
    // console.log(this.state.blobImage);
    var ImgData = new FormData();
    ImgData.append('picture', {
        uri: this.state.image,
        name: 'selfie.jpg',
        type: 'image/jpg'
    });
    const response = await fetch(
    //   `${uriBase}?visualFeatures=${visualFeatures}&details=${details}&language=${language}`,
    `https://eastus2.api.cognitive.microsoft.com/vision/v1.0/ocr?language=en&detectOrientation=true`,
      {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'Ocp-Apim-Subscription-Key': VISION_API,
        }),
        // body: JSON.stringify({"url": "http://digitalnativestudios.com/textmeshpro/docs/rich-text/line-indent.png"})
        body: ImgData
      }
    );

    let newResult = await response.json();
    console.log(newResult);  
    let newButtonText = []
    newResult.regions[0].lines.map((name, index) => {
        var curtline ="";
        for (let i = 0; i < name.words.length; i++) {
            curtline+=name.words[i].text;
            if (i != name.words.length -1) {
                curtline+=" ";
            }
        }
        newButtonText.push(curtline);
        console.log(curtline);  
    });
    this.setState({buttonText: newButtonText})
    this.setState({result: newResult});
    
  }

  handleNavSearch = (curtline) => {
    const { navigate } = this.props.navigation;
    navigate("Links", {text: curtline});
  }

  render() {
    let { image } = this.state;
    let buttons = this.state.buttonText.map((name, index) => {
        var curtline = name;
        console.log(curtline); 
        return (
            <Button title = {curtline} onPress={this.handleNavSearch.bind(this, curtline)}></Button>
        );
    });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <View>
            <Text>Upload image for identify</Text>
            <Button onPress={this.imageIdentify} title="Identify Text From Image">Identify</Button>

            <Text>Please select the recoginized text for product searching:</Text>
            
             {buttons}
            
            
            {/* <textarea style={{ height: 400, width: 200 }} value={JSON.stringify(this.state.result)} /> */}
        </View>
      </View>

        
    );
  }

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        // aspect: [1, 4],
      });
      console.log(result);
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        
      }
    } else {
      throw new Error('Camera roll permission not granted');
    }
  };
}