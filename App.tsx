//import {useIsAuthenticated} from "@azure/msal-react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import React, { useState, useEffect } from "react";
import { MoodProvider } from "./src/components/PopUps/MoodPointsContext";
import TestPage from "./src/components/Notifications/TestPage";


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


