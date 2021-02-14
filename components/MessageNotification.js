'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet,AsyncStorage, Platform} from 'react-native';

var config = require('../config.json');
let supportInterval;

class MessageNotification extends Component{

constructor(props){
    super(props);
    this.state = { 
      customerId:null,
      accessToken: null,
      unreadMsg:'',
      countValue:'',
    }  
  }
  
componentDidMount(){
 // this.countInterval();
 this.getNotes();
}

// countInterval(){
// 	this.supportInterval = setInterval(() => {
// 	   this.unreadMessageCount();
// 	  },5000);
// }

componentWillUnmount(){
	clearInterval(this.supportInterval);
}


 getNotes(){
  AsyncStorage.getItem('userId', (err, userId) => {
  console.log(userId);
  var bodyData = {
     "userId":JSON.parse(userId)
     }
    console.log("inside the home scrr",userId)
   fetch(config.baseUrl+'/notifyUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
        
      })
      .then((res) => {return res.json()})
      .then((res) => {
        console.log('response is',res)
        if (res.status)
        {
          if(res.data.id)
          {
          
           this.setState({countValue:res.data.id&& res.data.id.length>0?res.data.id.length:0})
          
          }
          
        }
        else
        {
         }
      })
    .catch((error) => {
      console.error(error);
  });
  });
}
render(){
    return(
      <View>
      	{
      	 this.state.countValue ?
      	 <View style={{marginTop:10}}>
      	 <Text>Notification</Text>	
         <Text style={styles.count}>{this.state.countValue}</Text>
         </View>
   		 : <View style={{marginTop:5}}>
      	 <Text style={{color:"#757575"}}>Notification</Text>	
         
         </View>
   		}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  count:{
	position:'absolute',
	width: 22,
	height: 22,
	paddingTop:3,
	alignItems:'center',
	right:-30,
	top:-1,
	fontSize:12,
	fontWeight: '500',
	color:'white',
	textAlign:'center',
	
	borderRadius:12,
 }

})

module.exports= MessageNotification