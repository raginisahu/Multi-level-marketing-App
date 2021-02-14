import React, {Component} from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {Text, View} from 'react-native';
import UserInput from './UserInput';
import LoginScreen from './LoginScreen';
import Payment from './Payment';
import Overview from './Overview';
import PaymentGateway from './PaymentGateway';
import {Alert,AsyncStorage,Share,Clipboard,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import referralImg from '../images/referral.png';
import menu from '../images/menu.png';
import GeneralStatusBar from './StatusBar';




var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class Referral extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      loginScreen : false,
      signUpScreen : true,
      overview:true,
      payment:false,
      username:"demo@gmail.com",
      password:"abc123",
      referral:"",
      name :"",
      pass:"",
      myAccount:false
    };

 this.buttonAnimated = new Animated.Value(0);
  }


  componentDidMount()
 {
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
    // do something
     console.log("inside the home scrfggggggggggggggggggggr")
      this.checkMyAccount();
  });
  AsyncStorage.getItem('referral', (err, referral) => {
    AsyncStorage.getItem('myAccount', (err, myAccount) => {
    console.log(referral);
    console.log("credits value :",referral,myAccount)
    try{
     
      var myAccounta = JSON.parse(myAccount)
      this.setState({referral:JSON.parse(referral),myAccount:myAccounta})
      // if(!myAccounta)
      // {
      //   Alert.alert(
      //     'Hello',
      //     'Please update you account details then you can refer',
      //     [
      //       {text: 'Cancel', onPress: () => {  this.props.navigation.navigate('Home')}},
      //       {text: 'Go', onPress: () => {
      //         this.props.navigation.navigate('UserProfile')
      //       }},
      //     ],
      //     { cancelable: false }
      //   )  
      // }
    }
    catch(e){
      Alert.alert(
        'Hello',
        'Please update you account details then you can refer',
        [
          {text: 'Cancel', onPress: () => {  this.props.navigation.navigate('Home')}},
          {text: 'Go', onPress: () => {
            this.props.navigation.navigate('UserProfile')
          }},
        ],
        { cancelable: false }
      )  
    }
   
    });
  }) 
 
 }

 checkMyAccount()
 {
   console.log("classes")
   AsyncStorage.getItem('myAccount', (err, myAccount) => {
   
    console.log("credits value :",myAccount)
    try{
     
      var myAccounta = JSON.parse(myAccount)
      this.setState({myAccount:myAccounta})
    }
    catch(e){

    }
  if(!this.state.myAccount)
  {
    Alert.alert(
      'Hello',
      'Please update your account details then you can refer and earn.',
      [
        {text: 'Cancel', onPress: () => {  this.props.navigation.navigate('Home')}},
        {text: 'Go', onPress: () => {
          this.props.navigation.navigate('UserProfile')
        }},
      ],
      { cancelable: false }
    )  
  }
})
 }
 readFromClipboard(messageTxt){
    console.log('Message Text', messageTxt);    
    Clipboard.setString(messageTxt);
    ToastAndroid.show(
      'Message Copied Successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };
  render() {
  
   const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Encoding':'application/gzip'
    }
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN+20, MARGIN],
    });
     const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Refer your friend and get 50% amount when they complete the first payment.Your referral code is:'+this.state.referral +' download the app using this link : https://www.google.com/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
   const username=  this.props.route.params?.userName ?? 'defaultValue';
   console.log("username os",username)
    return ( 
      <>
      <GeneralStatusBar backgroundColor="#40E0D0"
      barStyle="light-content"/>
      <ImageBackground style={this.state.myAccount?styles.picture:styles.picturen} source={bgSrc}>
       <View style={styles.navbarBox}> 
         <TouchableOpacity style={{justifyContent:'flex-start',flexDirection:'column'}} onPress={() => this.props.navigation.openDrawer()}>
         <Text style={styles.textR} > <Image source={menu} style={styles.menuimage} /> </Text>
         </TouchableOpacity>
         <Text  style={[styles.pageTitle,{fontWeight:'bold'
           }]}>
           Refer and earn
         </Text>
         </View>   
      <View style ={styles.card}>
        <Image source={referralImg} style={styles.image} />
        <Text style={{fontStyle:'italic',padding:10,fontSize:16,textAlign:'center'}}>Refer your friend and get 50% amount when they complete the first payment.Your referral code is:</Text>
        {
          this.state.myAccount?
        <Text style={styles.textl}>{this.state.referral}</Text>
        :
        null
        }
         <TouchableOpacity onPress={()=>{this.readFromClipboard(this.state.referral)}}>
         <Text style={styles.textr}> Tap to copy </Text>
         </TouchableOpacity>
      </View>
        {
          this.state.myAccount?
          <View style={styles.container}>
          <Animated.View style={{width: changeWidth}}>
            <TouchableOpacity
              style={styles.button}
              onPress={onShare}
              activeOpacity={1}>
              {this.state.isLoading ? (
                <Image source={spinner} style={styles.image} />
              ) : (
                <Text style={styles.submitButton}>Share</Text>
              )}
            </TouchableOpacity>
          
          </Animated.View>
        </View> 
        :
        null
        }
        </ImageBackground>
     </>
      
    );
  }
}

const styles = StyleSheet.create({
  containerpay: {
  marginTop:20
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#40E0D0",
    elevation:2,
    padding:10,
    borderRadius: 20,
 },
 submitButton:{
   fontSize:16,
   color:'white',
   padding:5,
 },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#F5FCFF',
      alignItems: 'center',
    justifyContent: 'flex-start',
    
  
  },
  picturen: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#F5FCFF',
      alignItems: 'center',
    justifyContent: 'flex-start',
    opacity:0.6
  
  },
    container: {
    
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop : 70
  },
  pageTitle:{
    textAlign:'left',
    fontSize:20,
    paddingTop:10,
    paddingLeft:10,
    fontFamily:'serif',
  },
  menuimage:{
height:30,
width:30
  },
  navbarBox: {
    flexDirection: 'row', 

    backgroundColor: "white",
    height:80,
   // paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    elevation:5,
    width:"100%"
  },
  button: {
    position: 'absolute',
    right:14,
    bottom:5,
    backgroundColor:'#40E0D0',
    width:"94%",
    height: MARGIN,
    borderRadius:20,
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    elevation:6,   
    zIndex:100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },

  
   image: {
    width: 150,
    height: 150,
  },
 card:{
 backgroundColor:'white',
 width:"85%",
 //padding:25,
 borderRadius:10,
 marginBottom:50,
 flexDirection:'column',
 alignItems:'center',
 padding:10,
marginTop:30

  },
  textR: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    paddingLeft: 20,
  },
    textr: {
    color: '#40E0D0',
    textAlign:'center',
    fontSize:20,
   
    backgroundColor: 'transparent',
      // marginBottom:20,
      alignItems:'center',
    paddingBottom: 5
  },
  overviewText:{
  color:'white',
  
  fontSize:14,
  padding:5,
  textAlign:'center'
  },
  textl: {
   // color: 'white',
    fontSize:24,
   alignItems:'center',
    height:80,
    borderRightWidth:1,
    borderRightColor:'#f5f5f5',
    paddingTop:20,
    textAlign:'center',
    width:"100%",
    fontWeight: 'bold',
    backgroundColor: 'transparent',
      //marginBottom:20,
    //marginTop: 20,
  },

});
