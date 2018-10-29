import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db } from '../db/db';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Nutrition',
  };

  constructor(props) {
     super(props)
     this.state = {
       TextInputValue: ''
     }
 }

 buttonClickListener = () =>{
     const { TextInputValue }  = this.state ;
     if(TextInputValue==="100g apple"||TextInputValue==="100g Apple"|| TextInputValue==="Apple 100g"||TextInputValue==="apple 100g"){
       Alert.alert("You're good to take supplements for Vitamin C!\nVitamin C: 3.1mg\n"+"daily recommendation value: 75mg");
     }
     else if(TextInputValue==="2000g apple"||TextInputValue==="2000g Apple"|| TextInputValue==="Apple 2000g"||TextInputValue==="apple 2000g"||TextInputValue==="2lbs apple"){
       Alert.alert("***Caution! Your intake VC is near recommendation value: 62mg\n"+
                  "daily recommendation value: 75mg");}
     else Alert.alert("Invalid input");
 }


 render() {
   return (
     <View style={styles.container}>
       <Text style={styles.headerText}>
        Check Nutrition Daily Value
       </Text>

       <TextInput
         style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2}}
         // Adding hint in TextInput using Placeholder option.
         placeholder=" Enter Food"
         //set the value in state.
         onChangeText={TextInputValue => this.setState({TextInputValue})}
         // Making the Under line Transparent.
         underlineColorAndroid="transparent"
       />

       <View style={[{ width: "93%", margin: 15, backgroundColor: "green" }]}>
         <Button
         onPress={this.buttonClickListener}
         title="Check Nutrition"
         color="#00B0FF"
         />
       </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#e5e5e5"
 },
 headerText: {
   fontSize: 20,
   textAlign: "center",
   margin: 10,
   fontWeight: "bold"
 }
});
