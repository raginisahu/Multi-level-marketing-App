
import React, { Component } from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import { Text, View, AsyncStorage } from 'react-native';
import UserInput from './UserInput';
import LoginScreen from './LoginScreen';
import Payment from './Payment';
import Overview from './Overview';
import PaymentGateway from './PaymentGateway';
import { CheckBox,Share, Clipboard, ToastAndroid, StyleSheet, TextInput, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Animated, Dimensions, Easing, ScrollView } from 'react-native';
import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import { WebView } from 'react-native-webview';
import contact from '../images/contact.png';
import menu from '../images/menu.png';
import GeneralStatusBar from './StatusBar';
import config from '../config.json';


var bgSrc = require('../images/wallpaper.png');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
export default class Privacy extends Component {

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
      userId: "",
      name: "",
      pass: "",
      check:false,
      accept:false
    };

    this.buttonAnimated = new Animated.Value(0);
  }


  componentDidMount() {
    const accept=  this.props.route.params?.accept ?? false;
    console.log("acceot",accept)
    AsyncStorage.getItem('userId', (err, userId) => {
      console.log(userId);
     try{
      var user = JSON.parse(userId)
     }
     catch(e){
      AsyncStorage.clear();
      this.props.navigation.navigate('Login');
     }
    this.setState({userId:user,accept:accept })
    })
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

  
checkDetail()
{
  console.log("name & pass",this.state.userId,this.state.check)
  if(this.state.check && this.state.userId )
  {
    // this block where the name and password enterd by user
     /* implementing the api to login the user */
     var userdata ={
      "isUpdate" :true,
      "userId" : this.state.userId,
      "privacyPolicy":this.state.check
  
    }
    this.updateDetails(userdata)
   // this.props.navigation.navigate('Home',{userName:"ragini"})
  }

  else{
    ToastAndroid.showWithGravityAndOffset(
      "Please accept the privacy policy",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      50
    );
  }
}

/* account update api called here */                                                              
updateDetails(userdata){
  console.log("update deyai")
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
          AsyncStorage.setItem('privacyPolicy',JSON.stringify(true));
          this.props.navigation.navigate('Payment')
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
            {
              this.state.accept?
              null
              :
              <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'column' }} onPress={() => this.props.navigation.openDrawer()}>
              <Text style={styles.textR} > <Image source={menu} style={styles.image1} /> </Text>
            </TouchableOpacity>
            }
           
            <Text style={[styles.pageTitle, {
              fontWeight: 'bold'
            }]}>
              Privacy Policy
          </Text>
            {/*// <TouchableOpacity onPress={() => navigate('AchievedTrophy')}>
          //       <Icon name="trophy" color="white" size={25} style={styles.achievedTrophy}/>
          //       <View style={styles.trophyCount}><Text style={[styles.trophyCountText,fontStyle.font]}>3</Text></View>
          // </TouchableOpacity>*/}


          </View>
          <ScrollView>
          <View style={styles.contentBox}>
          <Text></Text>
          <Text style={styles.text}>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our referral program.</Text>
          <Text style={styles.text}>By using the referral program, you agree to the collection and use of information in accordance with this policy.</Text>
          <Text style={styles.textheader}>{'\u2022'} Personal Data</Text>
          <Text style={styles.text}>Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</Text>
          <Text style={styles.textheader}>{'\u2022'} Referral program</Text>
          <Text style={styles.text}>For purposes of this Privacy Policy, referral is an act of disclosing personal data of another natural person with the goal of providing them with a quality service (Real Getting) that improves their work efforts and earning a reward for doing so.</Text>
          <Text style={styles.textheader}>{'\u2022'} Referrer</Text>
          <Text style={styles.text}>Referrer is a natural person who enters personal data of another natural person inside referral form thus referring them to us for a possible reward.</Text>
          <Text style={styles.textheader}>{'\u2022'} Referree</Text>
          <Text style={styles.text}>Referree is a natural person whose personal data is disclosed to us by Referrer.</Text>
          <Text style={styles.textheader}>{'\u2022'} Information Collection and Use</Text>
          <Text style={styles.text}>We collect minimal amount of data which is used only for purposes of referral process.</Text>
          <Text style={styles.textheader}>{'\u2022'} Types of Data Collected </Text>
          <Text style={styles.text}>Personal Data:</Text>
          <Text style={styles.text}>When referring a person, we ask you to provide us with certain personally identifiable information that can be used to contact or identify you and the person you're referring (“Personal Data”). Personally identifiable information is split in to two groups and includes:</Text>

          <Text style={styles.text}>Referrer data:</Text>

          <Text style={styles.text}>Full name</Text>
          <Text style={styles.text}>Email address</Text>
          <Text></Text>
          <Text style={styles.text}>Referree data:</Text>
          <Text></Text>
          <Text style={styles.text}>Full name</Text>
          <Text style={styles.text}>Email address</Text>
          <Text style={styles.text}>Phone number</Text>
          <Text style={styles.text}>Company name</Text>
          <Text style={styles.text}>Use of Data</Text>

          <Text style={styles.text}>Real Getting uses the data collected by referral for following purposes:</Text>
          <Text style={styles.text}>To contact Referree with an offer and general information about the Service</Text>
          <Text style={styles.text}>To identify the Referrer and match them to Referree once the Referree signs-up for the Service</Text>
          <Text style={styles.text}>To award the Referrer with referral prize once the Referree purchases the Service</Text>
          <Text style={styles.text}>Legal Basis for Processing Personal Data Under General Data Protection Regulation (GDPR)</Text>
          <Text style={styles.text}>If you are from the European Economic Area (EEA), Real Getting legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.</Text>
          <Text style={styles.text}>Real Getting may process your Personal Data because:</Text>
          <Text style={styles.text}>You have given us permission to do so by entering your data info referral form</Text>
          <Text style={styles.text}>The processing is in our legitimate interests and it’s not overridden by your rights</Text>

          <Text style={styles.textheader}>{'\u2022'} Retention of Data</Text>
          <Text style={styles.text}>Referrer</Text>
          <Text></Text>
          <Text style={styles.text}>Real Getting will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy or for a maximum of six (6) months.</Text>
          <Text style={styles.text}>After it has served its purpose, your data will be deleted.</Text>
          <Text></Text>
          <Text style={styles.text}>Referree </Text>
          <Text></Text>
          <Text style={styles.text}>Real Getting will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy or for a maximum of six (6) months.</Text>
          <Text></Text>
          <Text style={styles.text}>In case of declining our Service offer or not expressing interest in our services or products your data will be anonymized and we won't contact you anymore.</Text>

           <Text style={styles.textheader}>{'\u2022'} Transfer of Data</Text>
          <Text style={styles.text}>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</Text>
          <Text style={styles.text}>Data submission via referral form represents your agreement to that transfer.</Text>
          <Text style={styles.text}>Real Getting will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</Text>

           <Text style={styles.textheader}>{'\u2022'} Disclosure of Data</Text>
          <Text style={styles.text}>Business Transaction</Text>
          <Text style={styles.text}>If Real Getting is involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</Text>

           <Text style={styles.textheader}>{'\u2022'} Disclosure for Law Enforcement</Text>
          <Text style={styles.text}>Under certain circumstances, Real Getting may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</Text>

           <Text style={styles.textheader}>{'\u2022'} Legal Requirements</Text>
          <Text style={styles.text}>Real Getting may disclose your Personal Data in the good faith belief that such action is necessary to:</Text>
          <Text style={styles.text}>To comply with a legal obligation</Text>
          <Text style={styles.text}>To protect and defend the rights or property of Real Getting</Text>
          <Text style={styles.text}>To prevent or investigate possible wrongdoing in connection with the Service</Text>
          <Text style={styles.text}>To protect the personal safety of users of the Service or the public</Text>
          <Text style={styles.text}>To protect against legal liability</Text>
           <Text style={styles.textheader}>{'\u2022'} Security of Data</Text>
          <Text style={styles.text}>The security of your data is important to us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</Text>
          <Text style={styles.text}>Your Data Protection Rights Under General Data Protection Regulation (GDPR)</Text>
          <Text style={styles.text}>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Real Getting aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</Text>
          <Text style={styles.text}>If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</Text>
          <Text style={styles.text}>In certain circumstances, you have the following data protection rights:</Text>
          <Text style={styles.text}>The right to access, update or to delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Data by contacting us.</Text>
          <Text style={styles.text}>The right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete.</Text>
          <Text style={styles.text}>The right to object. You have the right to object to our processing of your Personal Data.</Text>
          <Text style={styles.text}>The right of restriction. You have the right to request that we restrict the processing of your personal information.</Text>
          <Text style={styles.text}>The right to data portability. You have the right to be provided with a copy of the information we have on you in a structured, machine-readable, and commonly used format.</Text>
          <Text style={styles.text}>The right to withdraw consent. You also have the right to withdraw your consent at any time where Real Getting relied on your consent to process your personal information.</Text>
          <Text style={styles.text}>Please note that we may ask you to verify your identity before responding to such requests.</Text>
          <Text style={styles.text}>You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</Text>

           <Text style={styles.textheader}>{'\u2022'} Children’s Privacy</Text>
          <Text style={styles.text}>Our Service does not address anyone under the age of 18 (“Children”).</Text>
          <Text style={styles.text}>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</Text>

           <Text style={styles.textheader}>{'\u2022'} Changes to This Privacy Policy</Text>
          <Text style={styles.text}>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</Text>

          <Text style={styles.text}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</Text>

           <Text style={styles.textheader}>{'\u2022'} Contact Us</Text>
          <Text style={styles.text}>We have a dedicated Data Protection Officer to help you with any requests or questions you have about your data. You can reach out to us by emailing realgetting00@gmail.com.</Text>
           
          </View>
          </ScrollView>
         {
          !this.state.accept?
              null
              :
            <TouchableOpacity style={styles.privacyBoxdiv} >
              <View  style={styles.privacyBox}>
              <CheckBox
                value={this.state.check}
                onValueChange={() => this.setState({check:!this.state.check})}
                style={styles.checkbox}
              />
              <TouchableOpacity><Text style={styles.textp}>Accept privacy policy</Text></TouchableOpacity>
              </View>
              <View  style={styles.privacyBox}>
          <TouchableOpacity style={{}} onPress={()=> this.checkDetail()}><Text style={styles.textn}>NEXT</Text></TouchableOpacity>
          </View>
        
        </TouchableOpacity>
     }
        </ImageBackground>
      </>


    );
  }
}

const styles = StyleSheet.create({
  containerpay: {
    //marginTop: 20
  },
  contentBox:{
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:30
  },
  privacyBox:{
    flexDirection:'row',
    padding:20,
   
     },
     privacyBoxdiv:{
      flexDirection:'row',
      padding:20,
      justifyContent:'space-around',
      justifyContent:'flex-start'
       },
     textp: {
      color: 'black',
      fontFamily:'serif',
      fontSize:14,
       paddingTop:5,
       fontWeight:'bold'
    },
    textn: {
      color: '#40E0D0',
      fontFamily:'serif',
      fontSize:14,
       paddingTop:5,
       fontWeight:'bold'
    },
  checkbox: {
    color:'white',
    backgroundColor:'transparent',borderColor:'white'
  },
  text: {
    color: 'black',
    fontFamily:'serif',
    fontSize:14
  },
  textheader:{
    textAlign:'center',
    //fontWeight:'bold',
    fontSize:16,
    fontFamily:'serif',
    padding:10
  },
  navbarBox: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: "white",
    height: 80,
    // paddingLeft:15,
    paddingRight: 15,
   // paddingTop: 15,
    elevation: 5,
    width: "100%"
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
    width: 30,
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
    //marginTop: 10
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
