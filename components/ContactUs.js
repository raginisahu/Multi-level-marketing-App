
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
import {Share,Clipboard,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import contact from '../images/contact.png';
import menu from '../images/menu.png';
import GeneralStatusBar from './StatusBar';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class ContactUs extends Component {

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
      pass:""
    };

 this.buttonAnimated = new Animated.Value(0);
   this.growAnimated = new Animated.Value(0);
  }

 _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }
  componentDidMount()
 {
  const referral=  this.props.route.params?.referral ?? 'defaultValue';
  console.log("credits value :",referral)
  this.setState({referral:referral})
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
      const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    
    });
     const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Refer your friend and get 50% amount when they complete the first payment.Your referral code is:'+this.state.referral,
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
      <ImageBackground style={styles.picture} >
         
         
         <View style={styles.navbarBox}>
         <TouchableOpacity style={{justifyContent:'flex-start',flexDirection:'column'}} onPress={() => this.props.navigation.openDrawer()}>
         <Text style={styles.textR} > <Image source={menu} style={styles.image1} /> </Text>
         </TouchableOpacity>
        
         <Text style={[styles.pageTitle,{fontWeight:'bold'
          }]}>
           Contact us
          </Text>
         </View>
      
          {/*// <TouchableOpacity onPress={() => navigate('AchievedTrophy')}>
          //       <Icon name="trophy" color="white" size={25} style={styles.achievedTrophy}/>
          //       <View style={styles.trophyCount}><Text style={[styles.trophyCountText,fontStyle.font]}>3</Text></View>
          // </TouchableOpacity>*/} 
       
       <View style={{alignItems:'center',justifyContent:'center'}}>
       <Image source={contact} style={styles.image} />
       <Text style={styles.text}></Text>
        <Text style={styles.text}>React out us at:</Text>   
       </View>       
        <View style={{flexDirection:'column',justifyContent:'flex-start',padding:40}}>  
         <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
        <Text  style={styles.text}><MaterialIcon
          name="email"
          color="#000000"
          size={18}
        /></Text> 
          <Text style={styles.text}>  Email : </Text>
          <Text style={styles.text}>realgetting00@gmail.com </Text>
          </View>
           <View style={{flexDirection:'row'}}>
           <Text  style={styles.text}><Entypo
          name="address"
          color="#000000"
          size={18}
        /></Text> 
          <Text style={styles.text}>  Address : </Text>
          <Text style={styles.text}>UP, India  </Text>
          </View> 
          </View>
      
      </ImageBackground>
  </>
     
      
    );
  }
}

const styles = StyleSheet.create({
  containerpay: {
  marginTop:20
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
    // navbarBox:{
    //     marginTop:20,
    //     height:80,
    //     backgroundColor:'#FFFFFF',
    //     width:"100%",
    //     elevation:2,
    //     justifyContent: 'space-around',
    //     flexDirection: 'column',
    // },
  
    pageTitle:{
      textAlign:'left',
      fontSize:20,
      paddingTop:12,
      paddingLeft:10,
      fontFamily:'serif',
    },
     image1:{
 height:30,
 width:30
    },
  picture: {
  	backgroundColor:'white',
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  
  
    justifyContent: 'flex-start',
    //marginTop : 10
  },
    container: {
    
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop : 70
  },
 
  text: {
    paddingTop:10,
    backgroundColor: 'transparent',
    fontStyle:'italic',
    fontSize:16,
    textAlign:'left',
    fontFamily:'serif'
  },
   image: {
    width: "50%",
    height: 150,
    marginTop:10,
    justifyContent:'flex-start',
   
  },
 card:{
 backgroundColor:'white',
 width:"85%",
 //padding:25,
 borderRadius:10,

 flexDirection:'column',
 justifyContent:'flex-end',

height:350,

  },
   card2:{
 backgroundColor:'white',
 width:"85%",
 //padding:25,
 borderRadius:10,
 marginBottom:50,
 flexDirection:'column',


height:250
  },
  textR: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    paddingLeft: 20,
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
