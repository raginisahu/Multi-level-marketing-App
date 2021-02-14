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
import {Picker,AsyncStorage,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
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
export default class SignupScreen extends Component {

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
      credit:"1",
      name :"",
      pass:"",
      country:'',
      currency:'',
      currencydata:[],
      min:0,
      unit:''
    };

  this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
 
    this.getMessage = this.getMessage.bind(this);
  }

  
componentDidMount(){
AsyncStorage.getItem('country', (err, countryp) => {
  try {
        country = JSON.parse(countryp);
         this.setState({country:country,unit:country?country.unit:'',currency:country?country.currency:'',min:JSON.stringify(country.minAmount),credit:JSON.stringify(country.minAmount)})
         console.log("djfkdjfjd",country)
    } catch(e) {
      console.log("excepom payment screen",e)
      this.props.navigation.navigate('Login')
    }

})
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
          
           this.setState({currencydata:res.data.id})
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
// this function to go to the paymetn screen 
  goPayment()
  {
      console.log("console",this.state.name,this.state.passs) 
   
   this.setState({payment: true,loginScreen:false,overview:false})
  }

  _onGrow() {
    Animated.timing(this.growAnimated, { 
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }
 goPaymentGateway()
 {
  if(this.state.credit && parseInt(this.state.credit)<parseInt(this.state.min))
  {
   ToastAndroid.showWithGravityAndOffset(
      "Please Enter The Amount Greater And Equal to"+this.state.min,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      50
    );
  }
  else{
  this.props.navigation.navigate('PaymentGateway',{credit:this.state.credit,country:this.state.country})
  }
  
 }
 setSelectedValue(country,index){
 console.log("itemValue",country,this.state.currencydata[index])
 this.setState({currency:country,countryData:this.state.currencydata[index]});
}
  getMessage(status)

  {
    console.log('eventpaytm===', status)
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
   const username=  this.props.route.params?.userName ?? 'defaultValue';
   console.log("username os",username)
    return (
      
      
      <>
      {/*<GeneralStatusBar backgroundColor="#40E0D0"
      barStyle="light-content"/>*/}
      <ImageBackground style={styles.picture} source={bgSrc}>
       <ScrollView>
         <Text> </Text>
       <Text> </Text>
       <Text> </Text>
       <Logo />
     
      
       <Text> </Text>
       <Text style={{fontWeight: 'bold'}}>          One time payment to access the app services.</Text>
       
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
    
        <View style ={styles.card}>
         <Text style={styles.textl}>Amount</Text>
         <Text style={styles.textu}>{this.state.unit}</Text>
         <TextInput style={styles.textr}
           onChangeText={credit => this.setState({credit})}
           value={this.state.credit}
           maxLength={10}
           keyboardType="numeric"
           />
           <Text style={[styles.textc]}>{this.state.currency}</Text>
           <Text style={{fontWeight: 'bold', fontSize: 16}}> Only</Text>
             {/* <TouchableOpacity >
              
         <Picker
          selectedValue={this.state.currency}
          style={[styles.picker]}
          onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue,itemIndex)}
         >
         {
          this.state.currencydata.map((items,i) =>
         {
           console.log("myAddresses: ",items);
           return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={items.currency} value={items.currency} key={i}/>
          }
        )}
        </Picker>
        </TouchableOpacity>*/}
        </View>
           
      
      </KeyboardAvoidingView>
    <Text> </Text>
       <Text> </Text>
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
             onPress={() => {this.goPaymentGateway()}}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Deposit</Text>
            )}
          </TouchableOpacity>
         
        </Animated.View>
      </View>  
<Text></Text>
           <Text style={{backgroundColor: 'yellow'}}> Get ~50% on each successful referral and earn unlimited. More features are coming soon. Join us and stay tuned.</Text>
        
       {/*<View style={styles.containerSignIn}>
        <Text onPress={() => {this.setState({loginScreen: true})}} style={styles.text}>Existing User</Text>
      </View>*/}
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
   picker: {
    
    // width: DEVICE_WIDTH - 40,
    height: 20,
    width:50,
   
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
  
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
   
    paddingVertical : 10, 
 
    color: '#ffffff'
    
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
   textu: {
  //  color: 'white',
    textAlign:'center',
    fontSize:26,
  //  fontWeight: 'bold',
    backgroundColor: 'transparent',
      // marginBottom:20,
      alignItems:'center',
      // width:"18%"
    //marginTop: 20,
  },
   
    textr: {
  //  color: 'white',
    textAlign:'center',
    fontSize:26,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
      // marginBottom:20,
      alignItems:'center',
      width:"18%"
    //marginTop: 20,
  },
   textc: {
  //  color: 'white',
    textAlign:'right',
    fontSize:16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
      // marginBottom:20,
      alignItems:'center',
      width:"10%"
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
