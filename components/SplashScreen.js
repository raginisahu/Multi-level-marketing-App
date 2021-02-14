import React, {Component} from 'react';

import {ImageBackground,StyleSheet, Image,AsyncStorage,ActivityIndicator} from 'react-native';

var bgSrc = require('../images/wallpaper.png');
import GeneralStatusBar from './StatusBar';
import OneSignal from 'react-native-onesignal';

export default class SplashScreen extends Component {

  
  constructor(props) {
    super(props); 
   // OneSignal.init("20b8bd65-844e-4c6f-ab50-1ef9f3a931d6");
  // OneSignal.setLogLevel(6, 0);
  
  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init("0893ddcb-3a5f-464d-8e0c-8d39bdaaf9e4", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  //OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

   OneSignal.addEventListener('received', this.onReceived);
   OneSignal.addEventListener('opened', this.onOpened);
   OneSignal.addEventListener('ids', this.onIds);
}
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

    onesignalInfo() {
      
      OneSignal.enableSound(true);
      OneSignal.enableVibrate(true);
      // OneSignal.inFocusDisplayType = OSNotificationDisplayTypeNotification;
      OneSignal.inFocusDisplaying(2);
      // OneSignal.OSNotificationDisplayType(2);
      // if(Platform.OS == 'ios')
      // {
      //   OneSignal.inFocusDisplaying = OSNotificationDisplayTypeNotification;
      // }
      // else{
      //   OneSignal.inFocusDisplaying(0);
      // }
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
     // OneSignal.configure();
      // OneSignal.getUserId(function (id) => { console.log(id) });
    }
  componentDidMount(){
  //   AsyncStorage.clear();
      this.onesignalInfo();
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
       console.log("inside the home scrfggggggggggggggggggggr")
       this.handleNav();
    });
    
  }

 handleNav(){
   AsyncStorage.getItem('userId', (err, userId) => {
     AsyncStorage.getItem('status', (err, status) => {
       AsyncStorage.getItem('privacyPolicy',(err,privacyPolicy)=>{
      console.log("userIdhjhjhjhhhjhjhj",status,userId)
      try{
         var statuss = JSON.parse(status)
      }
      catch(e)
      {
        console.log("Dfdfdf")
        var statuss=''
      }
      if(!userId)
      {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login')
      }
     else if (!privacyPolicy)
      {
        this.props.navigation.navigate('Privacy',{accept:true})
      }
       else if(userId&& statuss&&statuss == "paymentDone" || userId&& status== 'paymentDone' )
      {
          //this.props.navigation.navigate('Login')
        this.props.navigation.navigate('Drawer')
      }
      else if(userId)
      {
          this.props.navigation.navigate('Payment')
        
      }
     
      else{
        AsyncStorage.clear();
        this.props.navigation.navigate('Login')
       
      }
   })
  })
   
   })
 }
   
  render() {
    return (
      <>
      <GeneralStatusBar backgroundColor="#40E0D0"
      barStyle="light-content"/>
      <ImageBackground style={styles.picture} source={bgSrc}>
        <ActivityIndicator style={{marginTop:250}} size="large" color="#ffffff" />
      </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});