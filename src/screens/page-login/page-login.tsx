import React, { useContext, useState } from "react";
import { View, Text } from 'react-native';
import { Button } from "@react-native-material/core";
//import { loginRequest } from "../../../auth.config";
//import { useMsal } from "@azure/msal-react";
//import "@vaadin/login/vaadin-login-form.js";

const PageLogin = ({navigation}) => {

    // const {instance, accounts, inProgress } = useMsal();

    // if(accounts.length > 0) {
    //     return <span>There are currently {accounts.length} users signed in!</span>
    // } else if (inProgress === "login") {
    //     return <span>Login is currently in progress!</span>
    // } else {
        return(
            <View>
            <Text>Hello world - Azure Login</Text>
            {/* <Button title="Login"
            onPress={() => instance.loginRedirect(loginRequest)}/> */}
            <Button title="Login" onPress= {() => navigation.navigate('CreateCharacter')}></Button>
            </View>
        );
}

export default PageLogin;