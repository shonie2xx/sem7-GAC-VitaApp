//import {useIsAuthenticated} from "@azure/msal-react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import React, { useState, useEffect } from "react";
import { MoodProvider } from "./src/components/PopUps/MoodPointsContext";
import { NameProvider } from "./src/context/NameContext";
import * as Linking from 'expo-linking';
import TestPage from "./src/components/Notifications/TestPage";

const App = () => {
  const url = Linking.useURL();

  const onScreenLoad = () => {
    console.log(url)
  }

  return (
    <MoodProvider>
      <AuthProvider>
        <NameProvider>
          <AppNav />
        </NameProvider>
        {/* <TestPage/> */}
      </AuthProvider>
    </MoodProvider>
  );
}

export default App;


