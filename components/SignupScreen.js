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
import {Picker,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import config from '../config.json';
import referralCode from '../images/contact2.png';
import GeneralStatusBar from './StatusBar';

var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class SignupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username:"demo@gmail.com",
      password:"abc123",
      lname:'',
      email:'',
      mobile:'',
      fname :"",
      pass:"",
      referralcode:'',
      selectedValue:'',
      country:null,
      currency:[],
      countryData:null
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this.showPass = this.showPass.bind(this);
    this._onPress = this._onPress.bind(this);
    this.checkValues = this.checkValues.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _onPress(type) {
}

// this function to go to the paymetn screen 
checkValues()
{
  console.log("name & pass",this.state.name,this.state.pass)
  
  if(this.state.fname && this.state.lname && this.state.email&& this.state.mobile&& this.state.pass&& this.state.country)
  {
    // this block where theall fileds enterd by user 
     /* implementing the api to sign up the user */
      var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (reg.test(this.state.email)){
          if(this.state.mobile.length == 10 ){
           var userdata =
            {
              "isLogin" : false,
              "fName" : this.state.fname,
              "lName" : this.state.lname,
              "email" : this.state.email,
              "mobile" : this.state.mobile,
              "password" : this.state.pass,
              "referralCode":this.state.referralcode,
              "country":this.state.countryData
            }
            console.log("referralCode",userdata)
          this.signUp(userdata)
        }
        else
          {
            ToastAndroid.showWithGravity(
              'Please enter 10 digit mobile number ',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }
        else
        {
          ToastAndroid.showWithGravity(
            'Please enter your valid email ',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          ); 
        }
        }
        else{
          ToastAndroid.showWithGravityAndOffset(
            "All fileds are mandatory",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            50,
            50
          );
        }

}

 componentDidMount(){
   console.log("inside the home scrr")
  fetch(config.baseUrl+'/getCurrency', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {return res.json()})
      .then((res) => {
        console.log('response is',res,res.data)
        if (res.data.id)
        {
          if(res.data.id)
          {
          
           this.setState({currency:res.data.id})
           //console.log("currency")
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

/* signUp api called here */
signUp(userdata){
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
      console.log('response is',res)
      if (res.status)
      {
        if(res.data.id)
        {
          ToastAndroid.show(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          this.props.navigation.navigate('Login',{userName:"ragini"})
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
/* sign up api close here */

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }
 getFname(value)
 {
   this.setState({fname:value})
 }
 getLname(value)
 {
   this.setState({lname:value})
 }
 getemail(value)
 {
   this.setState({email:value})
 }
 getmobile(value)
 {
   this.setState({mobile:value})
 }
 getpass(value)
 {
   this.setState({pass:value})
 }
 getreferral(value)
 {
   this.setState({referralcode:value})
 }

setSelectedValue(country,index){
 console.log("itemValue",country,this.state.currency[index])
 this.setState({country:country,countryData:this.state.currency[index]});
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
    const { navigation } = this.props;    
    return (
      <>
     {/* <GeneralStatusBar backgroundColor="#FFFFFF"
      barStyle="light-content"/> */}
      <ImageBackground style={styles.picture} source={bgSrc}>
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
      
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
   
       <UserInput
         source={usernameImg}
         placeholder="First Name"
         autoCapitalize={'none'}
         returnKeyType={'done'}
         autoCorrect={false}
         onChangeText={fName => this.getFname(fName)}
       />
    
         <UserInput
         source={usernameImg}
         placeholder="Last Name"
         autoCapitalize={'none'}
         returnKeyType={'done'}
         autoCorrect={false}
         onChangeText={lname => this.getLname(lname)}
       />
  
       <UserInput
         source={usernameImg}
         placeholder="Email Address"
         autoCapitalize={'none'}
         returnKeyType={'done'}
         autoCorrect={false}
         onChangeText={email => this.getemail(email)}
       />
         
       <UserInput
         source={usernameImg}
         placeholder="Mobile Number"
         autoCapitalize={'none'}
         returnKeyType={'done'}
         autoCorrect={false}
         onChangeText={mobile => this.getmobile(mobile)}
           keyboardType='phone-pad'
       />
        
       <UserInput
         source={passwordImg}
         secureTextEntry={this.state.showPass}
         placeholder="Create New Password"
         returnKeyType={'done'}
         autoCapitalize={'none'}
         autoCorrect={false}
         onChangeText={pass => this.getpass(pass)}
      />
      
       <TouchableOpacity
         activeOpacity={0.7}
         style={styles.btnEyeSignUp}
         onPress={this.showPass}>
         <Image source={eyeImg} style={styles.iconEye} />
       </TouchableOpacity>
        <UserInput
         source={referralCode}
         placeholder="Referral Code (optional)"
         autoCapitalize={'none'}
         returnKeyType={'done'}
         autoCorrect={false}
         onChangeText={referralCode => this.getreferral(referralCode)}
       />
       <TouchableOpacity style={[styles.pickerinput]}>
        <Image source={usernameImg} style={styles.inlineImg} />
         <Picker
          selectedValue={this.state.country}
          style={[styles.picker]}
          onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue,itemIndex)}
         >
        {/*  <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label="Select country" value=''/> */}
         {
          this.state.currency.map((items,i) =>
         {
           console.log("myAddresses: ",items);
           return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={items.country} value={items.country} key={i}/>
          }
        )}
        </Picker>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.containerSignIn}>
       <Text onPress={() => {this.props.navigation.navigate("Login")}} style={styles.text}>Existing User</Text>
     </View>
     </ScrollView>
    
      
    <View style={styles.container}>
       <Animated.View style={{width: changeWidth}}>
         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.checkValues()}
           activeOpacity={1}>
           {this.state.isLoading ? (
             <Image source={spinner} style={styles.image} />
           ) : (
             <Text style={styles.text}>SIGN UP</Text>
           )}
         </TouchableOpacity>
        
       </Animated.View>
     </View>        
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
  picker: {
    
    // width: DEVICE_WIDTH - 40,
    height: 20,
    width:"100%",
    color: '#ffffff',
    //paddingBottom:50,
    //marginBottom:20,  
  },
    inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 15,
    top: 9,
    
  },
   pickerinput: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
   
    paddingVertical : 10, 
    borderRadius: 20,
    color: '#ffffff'
    
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#F5FCFF',
   
  },
    container: {
    
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
  button: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#40E0D0',
    // height: MARGIN,
    // borderRadius: 20,
    // zIndex: 100,
    // marginTop : 50,
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
    width: 24,
    height: 24,
  },

  containerSignIn: {
       
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom:100
  },
  btnEye: {
    position: 'absolute',
    top: 335,
    right: 28,
  },
  btnEyeSignUp: {
    position: 'absolute',
    top: 227,
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
