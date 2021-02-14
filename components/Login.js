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
import {CheckBox,AsyncStorage ,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import config from '../config.json';
import GeneralStatusBar from './StatusBar';


var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      loginScreen : false,
      signUpScreen : false,
      overview:true,
      payment:false,
      username:"demo@gmail.com",
      password:"abc123",
      credit:"1",
      name :"",
      pass:"",
      check:false
    };

     this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this.showPass = this.showPass.bind(this);
    this._onPress = this._onPress.bind(this);
   
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _onPress(type) {


}
// this function to go to the paymetn screen 
  goPayment()
  {
    console.log("name & pass",this.state.name,this.state.pass)
    if(this.state.name && this.state.pass )
    {
      // this block where the name and password enterd by user 
       /* implementing the api to login the user */
       var userdata ={
        "isLogin" : true,
        "email" : this.state.name,
        "password" : this.state.pass,
        "privacyPolicy":this.state.check
      }
      this.login(userdata)
    }
    else if(!this.state.name && !this.state.pass){
      ToastAndroid.showWithGravityAndOffset(
        "Please enter the username/email  and password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        50,
        50
      );
    }
    else if(!this.state.name){
      ToastAndroid.showWithGravityAndOffset(
        "Please enter the username/email",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        50,
        50
      );
    }
   
    else{
      ToastAndroid.showWithGravityAndOffset(
        "Please enter the password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        50,
        50
      );
    }
  }
  
  /* Login api called here */                                                               
  login(userdata){
      fetch(config.baseUrl+'/user-authentication', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata)
        
      })
      .then((res) => {return res.json()})
      .then((res) => {
        console.log('response is',res,res.data.referral)
        if (res.status)
        {
          if(res.data)
          {
            ToastAndroid.show(
              res.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            AsyncStorage.setItem('userId',JSON.stringify(res.data._id));
             AsyncStorage.setItem('status',JSON.stringify(res.data.status));
              AsyncStorage.setItem('country',JSON.stringify(res.data.country));
              AsyncStorage.setItem('referral',JSON.stringify(res.data.referral));
              AsyncStorage.setItem('myAccount',JSON.stringify(res.data.myAccount));
              if(res.data.privacyPolicy)
              {
                AsyncStorage.setItem('privacyPolicy',JSON.stringify(res.data.privacyPolicy));
                if(res.data.status == 'paymentDone')
                {
                  this.setState({name:'',pass:'',check:false});
                  this.props.navigation.navigate('Drawer',{userName:"ragini"})
                }
                else{
                  this.setState({name:'',pass:'',check:false});
                 this.props.navigation.navigate('Payment',{userName:"ragini"}) 
                }
              }
              else{
                this.props.navigation.navigate('Privacy',{accept:true})
              }
           
            
          }
          else{
            ToastAndroid.show(
              res.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          }
        }
        else
        {
          ToastAndroid.show(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /* Login api close here */

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

 getname(name)
 {
   console.log("name is:",name,this.state.name)
   this.setState({name:name})
 }
 getPass(pass)
 {
  this.setState({pass:pass})
  console.log("pass is:",pass,this.state.pass) 
}
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
    
    return (

      <>
     {/*} <GeneralStatusBar backgroundColor="#40E0D0"
      barStyle="light-content"/>*/}
    <ImageBackground  style={styles.picture} source={bgSrc}>
      <ScrollView>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Logo />
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>     
        <UserInput
          source={usernameImg}
          placeholder="Username/Email Address"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={name => this.getname(name)}
          value={this.state.name}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={pass => this.getPass(pass)}
          value={this.state.pass}   
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Animated.View style={{width: changeWidth, paddingLeft: 20}}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {this.goPayment()}}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text onPress={() => {this.goPayment()}} style={styles.text}>SIGN IN</Text>
            )}
           </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>   
        <View style={styles.containerSignIn}>
          <Text onPress={() => {this.props.navigation.navigate('SignupScreen')}} style={styles.text}>Create Account</Text>
          <Text style={styles.text}>Forgot Password?</Text>
        </View>
      
       
      </ScrollView>
    </ImageBackground>   
    </>
    );
  }
}

const styles = StyleSheet.create({
  containerpay: {
  flex:1,
  marginTop:20
  },
 
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#F5FCFF'
  },
    container: {
    
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop : 50
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
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },

  containerSignIn: {
       
      justifyContent: 'space-around',
      flexDirection: 'row',
  },
  
  btnEye: {
    position: 'absolute',
    top: 335,
    right: 28,
  },
  btnEyeSignUp: {
    position: 'absolute',
    top: 220,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
   input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
     width: DEVICE_WIDTH - 40,
    // height: 40,
   // marginHorizontal: 20,
    paddingLeft: 10,
    marginBottom:20,
    paddingVertical : 10, 
    borderRadius: 10,
    alignItems:'center',
    color: '#ffffff'
    
  },
  card:{
 backgroundColor:'white',
 width:"85%",
 //padding:25,
 borderRadius:10,
 marginBottom:50,
 flexDirection:'row',
 alignItems:'center'

  },
    textr: {
  //  color: 'white',
    textAlign:'center',
    fontSize:26,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
      // marginBottom:20,
      alignItems:'center',
      width:"50%"
    //marginTop: 20,
  },
  overviewText:{
  color:'white',
  fontWeight:'bold',
  fontSize:14,
  padding:5,
  textAlign:'center'
  },
  textl: {
   // color: 'white',
    fontSize:26,
   alignItems:'center',
    height:80,
    borderRightWidth:1,
    borderRightColor:'#f5f5f5',
    paddingTop:20,
    textAlign:'center',
    width:"50%",
    fontWeight: 'bold',
    backgroundColor: 'transparent',
      //marginBottom:20,
    //marginTop: 20,
  },

});
