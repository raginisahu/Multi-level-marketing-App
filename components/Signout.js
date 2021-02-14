
import React , {Component} from 'react';
import {Text,View,StyleSheet ,TouchableOpacity, Image} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Help from './Help';
import Privacy from './Privacy';
import UserProfile from './UserProfile';
import Referral from './Referral';
import Overview from './Overview';
import Home from './Home';

export default function signOut(){
    return(
      <TouchableOpacity onPress={()=>
        Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            {text: 'Cancel', onPress: () => {this.props.navigation.dispatch(DrawerActions.closeDrawer()) }},
            {text: 'Confirm', onPress: () => {
              AsyncStorage.clear();
              props.navigation.navigate('Login')
            }},
          ],
          { cancelable: false }
        )
      }>
        <Text style={{margin: 16,fontWeight: 'bold',color: 'red'}}>Logout</Text>
      </TouchableOpacity>
    )
  }
  
