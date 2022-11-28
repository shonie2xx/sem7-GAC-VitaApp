//import {useIsAuthenticated} from "@azure/msal-react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageCharacter from '../screens/page-create-character/page-create-character'
import { TabNav } from "./TabNav";
 import EventPage from '../components/NewsPage/EventPage';
 import * as Linking from 'expo-linking'
 import React, { useState, useEffect } from "react";
import PageHome from '../screens/page-home/page-home';
import { NavigationContainer } from '@react-navigation/native';


 const prefix = Linking.makeUrl("/");

 const Stack = createNativeStackNavigator();

const AppNav = () => {
  const Stack = createNativeStackNavigator();

  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "page-home",
      },
    },
  };

  const url = Linking.useURL();
  console.log(url);
  
    function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }

  useEffect (() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, [])

  return (
    <NavigationContainer linking={linking}>
    <Stack.Navigator>
        <Stack.Screen name="CreateCharacter" component={PageCharacter} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={TabNav} options={{ headerShown: false }} /> 
        <Stack.Screen name="page-home" component={PageHome} options={{ headerShown: false }} /> 
    </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNav;


