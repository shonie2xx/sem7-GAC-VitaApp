import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./components/flex.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, MsalContext } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

import { getUser, checkUser } from "./src/services/userService";

export const msalInstance = new PublicClientApplication(msalConfig);

export const contextType = MsalContext;

// Handle the redirect flows
msalInstance
  .handleRedirectPromise()
  .then((tokenResponse) => {
    if(tokenResponse != null){
      console.log("here");
      handleLogin(tokenResponse.accessToken);
      
    }
  })
  .catch((error) => {
    // Handle redirect error
    
  });

  const handleLogin = async (accessToken) => {
    console.log("here");
    var firstLogin = await checkUser(accessToken);
    localStorage.setItem("firstLogin", firstLogin)
    var user = await getUser(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  }

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);



// const root = ReactDOM.createRoot(document.getElementById("root"));
// const element = <React.StrictMode>
// <MsalProvider instance={msalInstance}>
//   <App />
//   </MsalProvider>
//   </React.StrictMode>;
// root.render(element);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
