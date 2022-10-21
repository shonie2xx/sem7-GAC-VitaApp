// import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
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
            <View style={styles.container}>
            <Text>Hello world - Azure Login</Text>
            {/* <Button title="Login"
            onPress={() => instance.loginRedirect(loginRequest)}/> */}
            <Button mode="outlined" onPress= {() => navigation.navigate('CreateCharacter')}>Login</Button>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
        justifyContent: 'center',
    },
  
  });

export default PageLogin;