//import {useIsAuthenticated} from "@azure/msal-react"
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageCharacter from '../screens/page-create-character/page-create-character'
import { TabNav } from "./TabNav";
 import EventPage from '../components/NewsPage/EventPage';


const AppNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
        <Stack.Screen name="CreateCharacter" component={PageCharacter} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={TabNav} options={{ headerShown: false }} /> 
        <Stack.Screen name="EventPage" component={EventPage} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}


export default AppNav;


