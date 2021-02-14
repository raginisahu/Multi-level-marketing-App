import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AsyncStorage,Dimensions,TouchableOpacity,Animated,StyleSheet, View, Text, Image} from 'react-native';
import spinner from '../images/loading.gif';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logoImg from '../images/logo.png';
import config from '../config.json';
import GeneralStatusBar from './StatusBar';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;


export default class PaymentGateway extends Component {
  
   constructor(props) {
    super(props);
    this.state = {
      loading: true,
      press: false,
      loginScreen : false,
      signUpScreen : false,
      Overview:false,
      userId:"",
      credit:0,
      country:''
    };
   }
 componentDidMount()
 {
  const credit=  this.props.route.params?.credit ?? 'defaultValue';
   const country=  this.props.route.params?.country ?? 'defaultValue';
  AsyncStorage.getItem('userId', (err, userId) => {
  console.log(userId);
  console.log("credits value :",credit,userId,country)
  try{
  this.setState({credit:credit,userId:JSON.parse(userId),country:country})
  }
  catch(e)
  {
    console.log("parse error catch",e)
  }

  }); 
 }
  getMessage(status)
  {
    console.log('eventpaytm',status)
    if(status&& status == 'paymentfail')
    {
      this.props.navigation.navigate('Payment')
    }
    else{
      this.props.navigation.navigate('Drawer')
      AsyncStorage.setItem('referral',JSON.stringify(status));
        AsyncStorage.setItem('status',"paymentDone");
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${ navigation.state.params.credit }`,
   
  });
  render() {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Encoding':'application/gzip'
    }
    // const text = this.props.navigation.getParams('credit','nothing sent');
    // let credit = params && params.credit ? params.credit : null;
 
    return (
      <>
    
      <View style={styles.container}>
      <WebView 
              source={{
                headers:headers,
                method:'GET',
                uri: config.baseUrl+"/paymentprocess?userId="+this.state.userId+"&credit="+this.state.credit+"country="+this.state.country,
              }}  
              onMessage={event => {
           this.getMessage(event.nativeEvent.data)
            console.log("event data",event.nativeEvent.data)
          }}
        />
      
      </View> 
      </>
    ); 
}
}
 

const styles = StyleSheet.create({
  container: {
    flex:1,
    //marginTop:10,
    }
});