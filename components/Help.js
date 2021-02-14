
import React, { Component } from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import { Text, View } from 'react-native';
import UserInput from './UserInput';
import LoginScreen from './LoginScreen';
import Payment from './Payment';
import Overview from './Overview';
import PaymentGateway from './PaymentGateway';
import { Share, Clipboard, ToastAndroid, StyleSheet, TextInput, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Animated, Dimensions, Easing, ScrollView } from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import contact from '../images/contact.png';
import menu from '../images/menu.png';
import GeneralStatusBar from './StatusBar';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class Help extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      loginScreen: false,
      signUpScreen: true,
      overview: true,
      payment: false,
      username: "demo@gmail.com",
      password: "abc123",
      referral: "",
      name: "",
      pass: ""
    };

    this.buttonAnimated = new Animated.Value(0);
  }


  componentDidMount() {
    const referral = this.props.route.params?.referral ?? 'defaultValue';
    console.log("credits value :", referral)
    this.setState({ referral: referral })
  }
  readFromClipboard(messageTxt) {
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
      'Accept-Encoding': 'application/gzip'
    }
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN + 20, MARGIN],
    });
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'Refer your friend and get 50% amount when they complete the first payment.Your referral code is:' + this.state.referral,
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
    const username = this.props.route.params?.userName ?? 'defaultValue';
    console.log("username os", username)
    return (
      <>
        <GeneralStatusBar backgroundColor="#40E0D0"
          barStyle="light-content" />
        <ImageBackground style={styles.picture} >




          <View style={styles.navbarBox}>
            <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'column' }} onPress={() => this.props.navigation.openDrawer()}>
              <Text style={styles.textR} > <Image source={menu} style={styles.image1} /> </Text>
            </TouchableOpacity>
            <Text style={[styles.pageTitle, {
              fontWeight: 'bold'
            }]}>
              Help
          </Text>
            {/*// <TouchableOpacity onPress={() => navigate('AchievedTrophy')}>
          //       <Icon name="trophy" color="white" size={25} style={styles.achievedTrophy}/>
          //       <View style={styles.trophyCount}><Text style={[styles.trophyCountText,fontStyle.font]}>3</Text></View>
          // </TouchableOpacity>*/}


          </View>

          <Text></Text>
          <MaterialIcon
          name="help-outline"
          color="#40E0D0"
          size={60}
        />
      
        <Text></Text>
        <Text></Text>
          <Text style={styles.text}>Reach us at realgetting00@gmail.com</Text>

        </ImageBackground>
      </>


    );
  }
}

const styles = StyleSheet.create({
  containerpay: {
    marginTop: 20
  },
  navbarBox: {
    flexDirection: 'row',

    backgroundColor: "white",
    height: 80,
    // paddingLeft:15,
    paddingRight: 15,
    paddingTop: 15,
    elevation: 5,
    width: "100%"
  },
  text: {
    color: 'black',
    fontFamily:'serif',
    fontSize:14
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
  textR: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    paddingLeft: 20,
  },
  pageTitle: {
    textAlign: 'left',
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily:'serif',
  },
  image1: {
    height: 30,
    width: 30
  },
  picture: {
    backgroundColor: 'white',
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
  container: {

    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 70
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40E0D0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    marginTop: -50
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
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    color: '#ffffff'

  },
  image: {
    width: "50%",
    height: 150,
    marginTop: 10
  },
  card: {
    backgroundColor: 'white',
    width: "85%",
    //padding:25,
    borderRadius: 10,

    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 50,
    height: 250,

  },
  card2: {
    backgroundColor: 'white',
    width: "85%",
    //padding:25,
    borderRadius: 10,
    marginBottom: 50,
    flexDirection: 'column',


    height: 250
  },
  textr: {
    color: '#40E0D0',
    textAlign: 'center',
    fontSize: 20,

    backgroundColor: 'transparent',
    // marginBottom:20,
    alignItems: 'center',
    paddingBottom: 5
  },
  overviewText: {
    color: 'white',

    fontSize: 14,
    padding: 5,
    textAlign: 'center'
  },
  textl: {
    // color: 'white',
    fontSize: 24,
    alignItems: 'center',
    height: 80,
    borderRightWidth: 1,
    borderRightColor: '#f5f5f5',
    paddingTop: 20,
    textAlign: 'center',
    width: "100%",
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    //marginBottom:20,
    //marginTop: 20,
  },

});
