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
import {AsyncStorage ,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import config from '../config.json';
import menu from '../images/menu.png';
var bgSrc = require('../images/wallpaper.png');
import GeneralStatusBar from './StatusBar';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      userId : '',
      signUpScreen : false,
      overview:true,
      payment:false,
      name:"",
      ifsc:"",
      bank:"",
      name :"",
      pass:""
    };

     this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this.showPass = this.showPass.bind(this);
    this._onPress = this._onPress.bind(this);
    this.checkDetail = this.checkDetail.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
   
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _onPress(type) {


}
// this function to go to the paymetn screen 

 componentDidMount(){
    AsyncStorage.getItem('userId', (err, userId) => {
     console.log(userId);
     this.setState({userId:userId ? JSON.parse(userId):userId})
    })
  }
  checkDetail()
  {
    console.log("name & pass",this.state.name,this.state.bank,this.state.ifsc)
    if(this.state.name && this.state.bank && this.state.ifsc)
    {
      // this block where the name and password enterd by user 
       /* implementing the api to login the user */
       var userdata ={
        "isUpdate" :true,
        "userId" : this.state.userId,
        "account" : this.state.bank,
        "accountHolderName" : this.state.name,
        "IFSC" : this.state.ifsc
      }
      this.updateDetails(userdata)
      this.props.navigation.navigate('Home',{userName:"ragini"})
    }
  
    else{
      ToastAndroid.showWithGravityAndOffset(
        "All details are mandatory",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        50,
        50
      );
    }
  }
  
  /* account update api called here */                                                               
  updateDetails(userdata){
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
          if(res.data)
          {
            ToastAndroid.show(
              res.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.navigate('Home',{userName:"ragini"})  
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
  /* account update api close here */

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
 getifsce(Value)
 {
  this.setState({ifsc:Value})
 console.log("pass is:",Value,this.state.ifsc) 
}

getbank(Value)
{
 this.setState({bank:Value})
//  console.log("pass is:",pass,this.state.pass) 
}

checkDetail()
 {
   console.log("name & pass",this.state.name,this.state.bank,this.state.ifsc)
   if(this.state.name && this.state.bank && this.state.ifsc)
   {
     // this block where the name and password enterd by user
      /* implementing the api to login the user */
      var userdata ={
       "isUpdate" :true,
       "userId" : this.state.userId,
       "account" : this.state.bank,
       "accountHolderName" : this.state.name,
       "IFSC" : this.state.ifsc,
       "myAccount":true
     }
     this.updateDetails(userdata)
     this.props.navigation.navigate('Home',{userName:"ragini"})
   }
 
   else{
     ToastAndroid.showWithGravityAndOffset(
       "All details are mandatory",
       ToastAndroid.LONG,
       ToastAndroid.BOTTOM,
       50,
       50
     );
   }
 }
 
 /* account update api called here */                                                              
 updateDetails(userdata){
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
         if(res.data)
         {
           ToastAndroid.show(
             res.message,
             ToastAndroid.LONG,
             ToastAndroid.BOTTOM,
           );
           AsyncStorage.setItem('myAccount',JSON.stringify(true));
           this.props.navigation.navigate('Home',{userName:"ragini"})  
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
 /* account update api close here */

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
      <GeneralStatusBar backgroundColor="#40E0D0"
      barStyle="light-content"/>
    <ImageBackground  style={styles.picture} source={bgSrc}>
          <View style={styles.navbarBox}>
          <TouchableOpacity style={{justifyContent:'flex-start',flexDirection:'column',padding:5}} onPress={() => this.props.navigation.openDrawer()}>
          <Text style={styles.textR} > <Image source={menu} style={styles.menuimage} /> </Text>
          </TouchableOpacity>
         
          <Text style={[styles.pageTitle,{fontWeight:'bold'
            }]}>
            My Account
          </Text>
          {/*// <TouchableOpacity onPress={() => navigate('AchievedTrophy')}>
          //       <Icon name="trophy" color="white" size={25} style={styles.achievedTrophy}/>
          //       <View style={styles.trophyCount}><Text style={[styles.trophyCountText,fontStyle.font]}>3</Text></View>
          // </TouchableOpacity>*/}
          
          {/* <TouchableOpacity style={{justifyContent:'flex-end',flexDirection:'column',flex:1}} onPress={() => this.props.navigation.openDrawer()}> */}
          <TouchableOpacity style={{justifyContent:'flex-end',flexDirection:'column',flex:1}} >
         
          {/* <Icon name="bars" size={25} style={styles.menuIcon}/>   */}
          </TouchableOpacity>
          </View> 
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
          placeholder="Bank account number"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={bank => this.getbank(bank)}
          value={this.state.bank}
        />
     
        <UserInput
          source={usernameImg}
          placeholder="IFSC code"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={ifsc => this.getifsce(ifsc)}
          value={this.state.ifsc}
        />
      
        <UserInput
          source={usernameImg}
          placeholder="Account holder name"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={name => this.getname(name)}
          value={this.state.name}
        />
          <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Animated.View style={{width: changeWidth, paddingLeft: 20}}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {this.checkDetail()}}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text onPress={() => {this.checkDetail()}} style={styles.text}>SAVE</Text>
            )}
           </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>   
        <View style={styles.containerSignIn}>
         
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
//  marginTop:20
  },
  navbarBox: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: "white",
    height:80,
    paddingLeft:15,
    paddingRight:15,
    alignContent:'center',
    elevation:5,
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#F5FCFF'
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
