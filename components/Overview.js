import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text,View,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import logoImg from '../images/logo.png';
import 'react-native-gesture-handler';
import Logo from './Logo';


var bgSrc = require('../images/wallpaper.png');
const MARGIN = 40;
export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }
  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN+20, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    
    });
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
      <Text> </Text>
      <Text> </Text>
      <Logo />
     
      <Text> </Text>
      <Text> </Text>
      
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
   
       <View style={styles.input}>
        <Text style={styles.overviewText}> Earn Daily Free Cash With Only One Time Step </Text>
       </View>
        <View style={styles.input}>
        <Text style={styles.overviewText}><Text> One Time Payment & Join Friend </Text></Text>
       </View>
        <View style={styles.input}>
        <Text style={styles.overviewText}><Text> Withdraw Money Daily</Text></Text>
       </View>
       
     </KeyboardAvoidingView>
   <Text> </Text>
      <Text> </Text>
     <View style={styles.container}>
       <Animated.View style={{width: changeWidth}}>
         <TouchableOpacity
           style={styles.button}
            onPress={() => {this.props.navigation.navigate('Login')}}
           activeOpacity={1}>
           {this.state.isLoading ? (
             <Image source={spinner} style={styles.image} />
           ) : (
             <Text style={styles.text}>Login</Text>
           )}
         </TouchableOpacity>
         <Animated.View
           style={[styles.circle, {transform: [{scale: changeScale}]}]}
         />
       </Animated.View>
     </View>        
      {/*<View style={styles.containerSignIn}>
       <Text onPress={() => {this.setState({loginScreen: true})}} style={styles.text}>Existing User</Text>
     </View>*/}
     </ImageBackground>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
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