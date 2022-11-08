import React, { createContext, useState } from "react";

export const NameContext = React.createContext()

export const NameProvider = ({children}) => {
    
    const [name, setName] = useState('Vincent')

    return (
        <NameContext.Provider value={"something"}>
            {children}
        </NameContext.Provider>
    )
}