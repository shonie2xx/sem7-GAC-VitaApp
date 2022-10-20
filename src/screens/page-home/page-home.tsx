import React, { useContext, useState } from "react";
import { View, Text } from 'react-native';
import { Button } from "@react-native-material/core";
import { loginRequest } from "../../../auth.config";
import { useMsal } from "@azure/msal-react";
import "@vaadin/login/vaadin-login-form.js";

const PageHome = () => {

    
        return(
            <View>
                <Text>Home</Text>
            </View>
        )
}

export default PageHome;
