
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
import {Linking,Share,Clipboard,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import contact from '../images/about.png';
import menu from '../images/menu.png';
import GeneralStatusBar from './StatusBar';
import config from '../config.json'



var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class AboutUs extends Component {

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
  }


 

  render() {
  
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
           About Us
          </Text>
          {/*// <TouchableOpacity onPress={() => navigate('AchievedTrophy')}>
          //       <Icon name="trophy" color="white" size={25} style={styles.achievedTrophy}/>
          //       <View style={styles.trophyCount}><Text style={[styles.trophyCountText,fontStyle.font]}>3</Text></View>
          // </TouchableOpacity>*/}
          
          
        </View> 
        <View style={{alignItems:'center',justifyContent:'center'}}>
       <Image source={contact} style={styles.imageabout} />
       <Text style={styles.text}></Text>
        <Text style={styles.text}>React out us at:</Text>   
       </View> 
        <Text style={styles.content}>We provide the best notes service with different features along with an earning option.
          It is secure in terms of transactions and our dedicated team give assistance at any time.
          For any help, concerns and suggestions reach out to us on help and write your query on the web address.
        </Text>
          <Text style={{ color: 'blue',textAlign:'center' }}
            onPress={() => Linking.openURL('http://realgetting.com')}>
            {config.appName}
          </Text>
      
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
 paddingTop: 20,
    backgroundColor: "white",
    height:80,
   // paddingLeft:15,
    paddingRight:15,
   // paddingTop:15,
    elevation:5,
    width:"100%"
  },
  content:{
   padding:20,
   fontSize:14,
   fontFamily:'serif',
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
    textR:{
      textAlign: 'right',
      justifyContent:'flex-end',
      paddingLeft:20,
    },
    pageTitle:{
      textAlign: 'left',
      fontSize: 20,
      paddingTop: 10,
      paddingLeft: 10,
      fontFamily:'serif',
    },
     image1:{
 height:30,
 width:30
    },
  picture: {
  	backgroundColor:'white',
    flex: 1,
    height:null,
    width:null,
    justifyContent: 'flex-start',
    
  },
    container: {
    
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop : 70
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40E0D0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    marginTop : -50
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
    paddingTop:10,
    backgroundColor: 'transparent',
    fontStyle:'italic',
    fontSize:16,
    textAlign:'left',
    fontFamily:'serif'
  },
   imageabout: {
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
marginTop:50,
height:250,

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
