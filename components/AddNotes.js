import React , {Component} from 'react';
import {BackHandler,TextInput,Text,View,StyleSheet ,TouchableOpacity, Dimensions,Image,AsyncStorage,ToastAndroid} from 'react-native';
import menu from '../images/menu.png';
import Entypo from 'react-native-vector-icons/Entypo';
import config from '../config.json';
import GeneralStatusBar from './StatusBar';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
/* this class is for adding the notes */
export default class AddNotes extends Component{
  constructor(props) {
    super(props);
    this.state = {
     commentMessage:'',
     note:"",
     id:"",
     title:""
    };
  }

closesupportModalNavigate(value){
  AsyncStorage.getItem('userId', (err, userId) => {
   if(this.state.commentMessage&& this.state.title){
    if(this.state.id)
    {
      if(value)
      {
          var notedata = {
        "id":this.state.id,
        "isDelete":true}
      }
      else{
         var notedata = {"note":this.state.commentMessage.trim(),
         "title":this.state.title.trim(),
        "id":this.state.id,
        "isUpdate":true}
      }
      
    }
    else{
      var notedata = {"note":this.state.commentMessage.trim(),
        "userId":JSON.parse(userId),
        "title":this.state.title.trim(),
        "isAdd":true}
    }
    this.addNotes(notedata);
    }
  else{
  // ToastAndroid.show(
  //  'Please write the notes',
  //   ToastAndroid.LONG,
  //   ToastAndroid.BOTTOM,
  // );
this.props.navigation.navigate('Drawer',{userName:"ragini"})
  }
})
}

componentDidMount(){
   const id=  this.props.route.params?.id ?? '';
    const note=  this.props.route.params?.note ?? '';
    const title=  this.props.route.params?.title ?? '';
    this.setState({commentMessage:note,id:id,title:title})
    console.log("bnote and id ",note,id)
     const backAction = () => {
    this.closesupportModalNavigate()
   }
     const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }
// add notes function 
addNotes(notedata){
 console.log("notekjjkdfjk",notedata)
 AsyncStorage.getItem('userId', (err, userId) => {
 console.log(userId);
 fetch(config.baseUrl+'/Notes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notedata)
        
      })
      .then((res) => {return res.json()})
      .then((res) => {
        console.log('response is',res)
        if (res.status)
        {
          if(res.data.id)
          {
            ToastAndroid.show(
              res.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            this.setState({commentMessage:''})
            this.props.navigation.navigate('Drawer')
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
  }); 
  
}
    render() {

        return(
          <>
          <GeneralStatusBar backgroundColor="#40E0D0"
          barStyle="light-content"/>
            <View style={styles.picture}>
                <View style={styles.navbarBox}>
                  <TouchableOpacity onPress={() => {this.closesupportModalNavigate()}}>
                    <Text style={[styles.crossIcon]}><Entypo name="cross" color="black" size={25}/></Text> 
                  </TouchableOpacity>
                   <Text style={[{fontSize:16,color:"black",textAlign:'center',flex:1}]}>Add the new note</Text>
                    <TouchableOpacity onPress={() => {this.closesupportModalNavigate('delete')}}>
                    <Text style={[styles.crossIcon]}><MaterialIcon name="delete" color="black" size={22}/></Text> 
                  </TouchableOpacity>
                </View> 
                {/* <Text style={[{color:"black",fontSize:18}]}>Message</Text> */}
                <View style={{width:"90%"}}>
                     <View style={styles.messageInputBox}>
                     <TextInput
                      style={[{paddingLeft:5,fontSize:16,paddingBottom:5}]}
                       placeholder="Write title here.."
                      value ={this.state.title}
                      autoFocus={true}
                      underlineColorAndroid = "#DCDCDC"
                      placeholderTextColor="#757575"
                      onChangeText={ (title) => this.setState({ title:title })}/>  
                     </View>
                  
                      <Text></Text>
                      <View style={styles.textAreaContainer} >
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        maxLength={120}
                        value={this.state.commentMessage}
                        multiline={true}
                        onChangeText={ (commentMessage) => this.setState({ commentMessage:commentMessage })}/>  
                    </View>
                    {/* <TouchableOpacity onPress={() => {this.closesupportModalNavigate()}} style={{marginTop:10, 
                      alignItems:'center',
                      borderRadius:25,
                      borderColor:"#40E0D0",borderWidth:1,
                      backgroundColor: '#40E0D0',
                      width:"40%",
                      justifyContent:'flex-end',
                        // flex:1,
                      flexDirection:'column',
                      alignContent:'flex-end',
                      //  height:40,
                      alignSelf:'flex-end',
                      alignContent:'center'
                      }}>
                      <Text style={[{textAlign:'center',fontSize:14,color:"white",padding:8,paddingBottom:7}]}>ADD NOTES</Text>
                    </TouchableOpacity>  */}
                </View>
              </View>
              </>
       )       
    }
}

const styles = StyleSheet.create({
  containerpay: {
    flex:1,
    marginTop:20
    },
    textAreaContainer: {
      borderColor:"#F5F5F5",
      borderWidth: 1,
      padding: 5,
      height:DEVICE_HEIGHT
    },
    textArea: {
      fontSize:16,
      justifyContent: "flex-start"
    },
    messageInputBox:{
      height: 45,
       backgroundColor:'white',
      width:"100%",
      fontSize:16,
      padding:5,
      marginTop:20
      
      
    },
    navbarBox: {
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: "white",
      height:90,
      paddingLeft:15,
      paddingRight:15,
      alignContent:'center',
      elevation:5,
      paddingTop:20
    },
    navBox:{
      // flexDirection:"row",
      // height:60,
      // backgroundColor:"white",
      // elevation:5,
      // marginTop:1,
      // alignItems:'center',
      // justifyContent:'flex-start'
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: 'white',
      height: 60,
      paddingLeft:15,
      paddingRight:15,
      justifyContent: 'flex-start',
      marginTop:1,
      // borderBottomWidth:1,
      // borderColor: Colors.borderColor,
    },
    crossIcon:{
      fontSize: 18,
      textAlign: 'left',
      color: "black",
      flex:0,
    },
    textR:{
        textAlign: 'right',
        justifyContent:'flex-end',
        paddingLeft:20,
      },
      pageTitle:{
        textAlign:'left',
        fontSize:20,
        paddingTop:30,
        paddingLeft:10
      },
      image:{
   height:50,
   width:50
      },
      picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        backgroundColor: '#FFFFFF',
        alignContent:'center',
        alignItems:'center',
      },
})