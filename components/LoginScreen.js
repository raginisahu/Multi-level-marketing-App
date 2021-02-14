import React, {Component} from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {Text, View} from 'react-native';
import {StyleSheet, Image,ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
var bgSrc = require('../images/wallpaper.png');
export default class LoginScreen extends Component {
  render() {
    return (
     <ImageBackground style={styles.picture} source={bgSrc}>
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit />
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#F5FCFF'
  },
});