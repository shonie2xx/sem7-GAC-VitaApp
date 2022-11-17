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
  const { isLoading } = useContext(AuthContext);
  
   const { userToken } = useContext(AuthContext);

  //const userToken = SecureStore.getItemAsync

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  }

  return (
    <NavigationContainer>
      {userToken !== null ?
        <StackNav /> : <AuthNav />
      }
    </NavigationContainer>

  );
}


export default AppNav;


