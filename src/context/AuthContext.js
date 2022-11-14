import React, { createContext, useState } from "react";

export const AuthContext = createContext(); 

export const AuthProvider = ({children}) => {
    
    const [isLoading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setUserToken("user token");
        setLoading(false);
    }

    const logout = () => {
        setUserToken(null);
        setLoading(false);
    }

    return (
       <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
       </AuthContext.Provider>
    )
}
