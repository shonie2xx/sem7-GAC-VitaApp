//import {useIsAuthenticated} from "@azure/msal-react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import React, { useState, useEffect } from "react";
import { MoodProvider } from "./src/components/PopUps/MoodPointsContext";
import TestPage from "./src/components/Notifications/TestPage";
import {NameProvider } from "./src/context/NameContext";

const App = () => {

  return (
    <MoodProvider>
      <AuthProvider>
        <NameProvider>
          <TestPage />
          <AppNav />
        </NameProvider>
      </AuthProvider>
    </MoodProvider>
  );
}


export default App;


