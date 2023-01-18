import React, { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';
import { MsalContext } from "@azure/msal-react";
import { loginRequest } from "../../src/authConfig.js";

// import * as SecureStore from 'expo-secure-store';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired
    };
    const [accessToken, setAccessToken] = useState(null);
    const { instance } = useContext(MsalContext);
    
    
    return (
        <AuthContext.Provider value={{ accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}
