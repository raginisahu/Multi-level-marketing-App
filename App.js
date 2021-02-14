// In App.js in a new project

import * as React from 'react';
import { View, Text ,AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Overview from './components/Overview';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import Payment from './components/Payment';
import Login from './components/Login';
import PaymentGateway from './components/PaymentGateway';
import Referral from './components/Referral';
import Home from './components/Home';
import AddNotes from './components/AddNotes';
import Drawer from './components/Drawer';
import SplashScreen from './components/SplashScreen';
import Privacy from './components/Privacy';

function SplashScreensss() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
   var Screen= "";
  // getting the screeb detaiks
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen options={{ headerShown:false}} name="Overview" component={Overview} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen options={{ headerShown:false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen  name="PaymentGateway" component={PaymentGateway} />
        <Stack.Screen name= "Referral" component={Referral} />
        <Stack.Screen options={{ headerShown:false}} name='Home' component={Home} />
        <Stack.Screen options={{ headerShown:false}} name ='AddNotes' component={AddNotes} />
        <Stack.Screen name="Privacy" options={{ headerShown:false}} component={Privacy}/>
        <Stack.Screen options={{ headerShown:false}} name="Drawer" component={Drawer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;