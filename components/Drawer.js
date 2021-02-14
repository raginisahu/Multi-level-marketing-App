import React , {Component} from 'react';
import {Alert,Text,View,StyleSheet ,AsyncStorage, Image} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Help from './Help';
import Privacy from './Privacy';
import UserProfile from './UserProfile';
import Referral from './Referral';
import Overview from './Overview';
import Home from './Home';
import Signout from './Signout';
import Notification from './Notification';
import MessageNotification from './MessageNotification';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
/* this class is for adding the notes */

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign out" icon= {({ focused, color, size }) => <AntDesign  color="#000000" size={20} name="logout" />} onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.navigate('Login')
                  }},
                ],
                { cancelable: false }
              )  
            } />
             
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

export default function App() {
  return (
     
      <Drawer.Navigator drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 , fontSize:26 },
      }}  drawerContent={props => <CustomDrawerContent {...props} />}  drawerStyle={{ marginTop:40,width: '60%' , backgroundColor: '#ffffff',}}  overlayColor="transparent" initialRouteName="Home">
          <Drawer.Screen name="Home" options={{  drawerIcon: ({ tintColor }) => (
        <MaterialIcon
        name="home"
        color="#000000"
        size={20}
      />
      ) }} component={Home}  /> 
          <Drawer.Screen name="Referral" options={{ drawerLabel: 'Refer and earn',  drawerIcon: ({ tintColor }) => (
      <MaterialIcon
      name="share"
      color="#000000"
      size={20}
    />
    ) }} component={Referral} />
          <Drawer.Screen name="AboutUs"  options={{ drawerLabel: 'About us' , drawerIcon: ({ tintColor }) => (
      <FontAwesome
      name="user"
      color="#000000"
      size={20}
    />
    )}} component={AboutUs} />
        <Drawer.Screen name="Privacy policy" options={{  drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
      name="file-document-outline"
      color="#000000"
      size={20}
    />
    )}} component={Privacy} />
        <Drawer.Screen name="ContactUs"  options={{ drawerLabel: 'Contact us' , drawerIcon: ({ tintColor }) => (
      <AntDesign
      name="contacts"
      color="#000000"
      size={20}
    />
    )}} component={ContactUs} />
        <Drawer.Screen name="Help" options={{  drawerIcon: ({ tintColor }) => (
      <MaterialIcon
      name="help"
      color="#000000"
      size={20}
    />
    ) }} component={Help} />
       
        <Drawer.Screen name="UserProfile" options={{ drawerLabel: 'My Account', drawerIcon: ({ tintColor }) => (
      <FontAwesome
      name="user-circle"
      color="#000000"
      size={20}
    />
    ) }} component={UserProfile} />
    <Drawer.Screen name="Notification" options={{ drawerLabel: ()=>(
      <View>
             <MessageNotification/>
            </View>), drawerIcon: ({ tintColor }) => (
      <MaterialIcon
      name="notifications"
      color="#000000"
      size={20}
    />
    ) }} component={Notification} />
        
      </Drawer.Navigator>
   
  );
}