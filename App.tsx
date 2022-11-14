//import {useIsAuthenticated} from "@azure/msal-react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import React, { useState, useEffect } from "react";
import { MoodProvider } from "./src/components/PopUps/MoodPointsContext";


const App = () => {
  
  return (
  <AuthProvider >
    <AppNav />
  </AuthProvider>
  );
}


export default App;


