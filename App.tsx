//import {useIsAuthenticated} from "@azure/msal-react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import React, { useState, useEffect } from "react";
import { MoodProvider } from "./src/components/PopUps/MoodPointsContext";
import TestPage from "./src/components/Notifications/TestPage";
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import PageHome from "./src/screens/page-home/page-home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const App = () => {



  return (
    <MoodProvider>
      <AuthProvider >
        <TestPage />
        <AppNav />
      </AuthProvider>
    </MoodProvider>
  );
}


export default App;


