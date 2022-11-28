import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './StackNav';
import AuthNav from './AuthNav';
import { AuthContext } from '../context/AuthContext';

const AppNav = () => {

  const { accessToken } = useContext(AuthContext);

  return (
    // <NavigationContainer>
    //   {accessToken !== null ?
    //     <StackNav /> : <AuthNav /> 
    //   }
    // </NavigationContainer>
    <NavigationContainer>
        <StackNav /> 
    </NavigationContainer>
  );
}


export default AppNav;


