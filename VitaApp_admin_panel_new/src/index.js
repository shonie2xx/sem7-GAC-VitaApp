import 'react-app-polyfill/stable'
import 'core-js'
import App from './App'
import reportWebVitals from './reportWebVitals'
import React from "react";
import ReactDOM from "react-dom";

// import "./index.css";
// import "./components/flex.css";
import { AuthProvider } from './context/AuthContext';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, MsalContext } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { checkUser, getUser } from "./services/userService";
import { Provider } from 'react-redux';
import store from './store';

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
        <Provider store={store}>
          <App />
        </Provider>,
    </MsalProvider >
  </React.StrictMode >,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

