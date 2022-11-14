import { Dimensions } from 'react-native';
import React , { useState, useEffect }  from 'react';


import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const windowWidth = Dimensions.get('window').width;

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
//import { MsalContext } from "@azure/msal-react";

const HomePage = () => {
    const [dimensions, setDimensions] = useState({ windowWidth });

    

    //const [callbackId, setCallbackId] = useState(null);
    //const [firstLogin, setFirstLogin] = useState(null);
    
    
    
    return(
      //         <View>

      //     <View ></View>

      //     <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

      //     <View style={styles.body}>
      //       <View style={styles.bodyContent}>
      //         <Text style={styles.name1}>John Doe</Text>
              
      //         {/* <TouchableOpacity style={styles.buttonContainer}>
 
      //         </TouchableOpacity> */}
      //       </View>
      //   </View>
      // </View>
      <view>
        
      </view>
        
    );
}

export default HomePage;

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#FFE06A",
      height:200,
    //   width: {windowWidth},
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name1:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });
  