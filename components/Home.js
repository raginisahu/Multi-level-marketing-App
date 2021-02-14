import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert,BackHandler,FlatList,AsyncStorage,Text,View,ToastAndroid,StyleSheet,TextInput,Image,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Animated,Dimensions,Easing, ScrollView} from 'react-native';
import { NavigationContainer ,useIsDrawerOpen,useIsFocused } from '@react-navigation/native';
import {NavigationEvents} from 'react-navigation';
import logoImg from '../images/logo.png';
import { createDrawerNavigator,DrawerActions } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import config from '../config.json';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Logo from './Logo';
// import { useIsDrawerOpen } from 'react-navigation';
import menu from '../images/menu.png';
import GeneralStatusBar from './StatusBar';


var bgSrc = require('../images/wallpaper.png');
const MARGIN = 40;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     notes:[]
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }
  getNotes(){
  AsyncStorage.getItem('userId', (err, userId) => {
  console.log(userId);
  var bodyData = {
     "userId":JSON.parse(userId)
     }
    console.log("inside the home scrr",userId)
   fetch(config.baseUrl+'/Notes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
        
      })
      .then((res) => {return res.json()})
      .then((res) => {
       // console.log('response is',res,res.data.id)
        if (res.status)
        {
          if(res.data.id)
          {
          
           this.setState({notes:res.data.id})
           console.log("notes",this.state.notes)
          }
          
        }
        else
        {
           this.setState({notes:[]})
         }
      })
    .catch((error) => {
      console.error(error);
  });
  });
  }
  componentDidMount(){
   console.log("inside the home scrr")
   this.getNotes();
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
       console.log("inside the home scrfggggggggggggggggggggr")
        this.getNotes();
    });
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
     const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }


  addRecordModalVisible(note,id,title){
    this.props.navigation.navigate('AddNotes',{'note':note,'id':id,'title':title});
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

      <>
      <GeneralStatusBar backgroundColor="#40E0D0"
      barStyle="light-content"/>
      <View style={styles.picture}>
     
          <View style={styles.navbarBox}>
         
          <TouchableOpacity style={{justifyContent:'flex-start',flexDirection:'column'}} onPress={() => this.props.navigation.openDrawer()}>
          <Text style={styles.textR} > <Image source={menu} style={styles.image} /> </Text>
          </TouchableOpacity>
          <Text  style={[styles.pageTitle,{fontWeight:'bold'
            }]}>
            Notes
          </Text>
          </View> 
         {/* <View style={styles.header}>
           <View> <Text>Home</Text></View>
           <TouchableOpacity>
           <Text style={styles.textR} > <Image source={menu} style={styles.image} /> </Text>
           </TouchableOpacity>
         </View> */}
          {
            this.state.notes && this.state.notes.length <= 0 ?
            <View style={{flex:1,width:"100%"}}>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text style={styles.noNotes}>Add your first note </Text>  
            <Text> </Text>
            <Text> </Text>      
           <Text> </Text>
             <Text> </Text>
            <Text> </Text>
            <Text> </Text>
           <View style={styles.addRecordFab}>
            <TouchableOpacity onPress={() => {this.addRecordModalVisible()}} style={styles.addFabBtn}>
            <Text style={{fontSize:40,color:'white'}}>+</Text>
            {/* <Text style={{fontSize:14,color:'white'}}> ADD</Text> */}
            </TouchableOpacity>
            </View>
            </View>
            :
            <View style={{marginTop:'5%'}}>
            <ScrollView style={{marginBottom:50}}>
            <FlatList
              data={this.state.notes}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item,index}) => 
              <TouchableOpacity key={index}  onPress={() => {this.addRecordModalVisible(item.note,item._id,item.title)}} style={{marginTop:'5%',marginLeft:'5%',marginRight:'5%',marginBottom:'2%'}}>
              <LinearGradient colors={['#e1bee7','#ffebee','#ffffff']} style={styles.linearGradient}>
                <View style={styles.offerListView}>
               
                 
                  <View style={{width:'100%',borderRadius:20}}>
                  <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.offerListTitle}>{item.title}</Text>
              
                 <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.offerDescription}>{item.note}</Text>
                  </View>
                  {/* <View style={{width:'10%'}}>
                    <TouchableOpacity  onPress={() => {this.addRecordModalVisible()}} >
                      <MaterialIcon name="keyboard-arrow-right" size={30} style={{color:'#bdbdbd'}}/>
                    </TouchableOpacity>
                  </View> */}
                </View>
                </LinearGradient>
        
                </TouchableOpacity>
              }
            />
            </ScrollView>
            <View style={styles.addRecordFab}>
            <TouchableOpacity onPress={() => {this.addRecordModalVisible()}} style={styles.addFabBtn}>
            <Text style={{fontSize:40,color:'white'}}>+</Text>
            {/* <Text style={{fontSize:14,color:'white'}}> ADD</Text> */}
            </TouchableOpacity>
            </View>
            </View>
      }
      {/*<View style={styles.containerSignIn}>
       <Text onPress={() => {this.setState({loginScreen: true})}} style={styles.text}>Existing User</Text>
     </View>*/}
     </View>
     </>
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
    navbarBox: {
      flexDirection: 'row', 
  
      backgroundColor: "white",
      height:80,
     // paddingLeft:15,
      paddingRight:15,
      paddingTop:15,
      elevation:5,
      width:"100%"
    },
     linearGradient: {
    width:'100%',
    borderRadius: 2,
    elevation:0.2,
  },
   offerListView:{
    flexDirection:'row',
    paddingTop:15,
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:20,
    justifyContent:'space-between'
  },
  offerListTitle:{
    fontSize:16,
    color:'#000000',
  },
  offerDescriptionView:{
    width:'100%',
    paddingBottom:15,
    paddingLeft:20,
    paddingRight:20,
  },
  offerDescription:{
    width:'80%',
    fontSize:14,
    color:'#a0a0a0',
    paddingTop:5
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
    textR:{
      textAlign: 'right',
      justifyContent:'flex-end',
      paddingLeft:20,
    },
    pageTitle:{
      textAlign:'left',
      fontSize:20,
      paddingTop:10,
      paddingLeft:10,
      fontFamily:'serif',
    },
    image:{
    height:30,
    width:30
    },
    picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
      backgroundColor: '#FFFAFA',
      alignContent:'center',
      alignItems:'center',
    },
    noNotes:{
        fontSize:16,
        fontFamily:'',
        alignContent:'center',
        textAlign:'center'
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
      textAlign:'left',
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
    textAlign:'left'
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
    
  addRecordFab: {
    position: 'absolute',
    right:15,
    bottom:95,
    backgroundColor:'#40E0D0',
    width:60,
    height:60,
    borderRadius:30,
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    elevation:6,   
    zIndex:1,
  },

  addFabBtn: {
    flexDirection:'row',
  },
});