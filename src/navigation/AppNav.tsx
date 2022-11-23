//import {useIsAuthenticated} from "@azure/msal-react"
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './StackNav';
import AuthNav from './AuthNav';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AppNav = () => {
  
  const isLogin = async () => {
    const userToken = await SecureStore.getItemAsync("User");
    console.log("appnav", userToken)
    
    if(userToken == null) {
      console.log("if its null");
    } else {
      console.log("if its not null", userToken)
    }
  }
  

  return (
    <NavigationContainer>
      {isLogin !== null ?
       <AuthNav /> : <StackNav />
      }
    </NavigationContainer>

  );
}


export default AppNav;


