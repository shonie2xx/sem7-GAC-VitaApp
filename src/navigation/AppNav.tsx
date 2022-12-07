import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeStack from './WelcomeStack';
import AuthNav from './AuthNav';
import { AuthContext } from '../context/AuthContext';
import TestPage from "../components/Notifications/TestPage";
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

const AppNav = () => {

  const { accessToken } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
      {accessToken !== null ?
        <WelcomeStack /> : <AuthNav /> 
      }
    </NavigationContainer>
    </SafeAreaView>
    // <NavigationContainer>
    //   <WelcomeStack />
    //   <TestPage />
    // </NavigationContainer>
  );
}


export default AppNav;


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});