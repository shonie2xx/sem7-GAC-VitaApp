import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import { AuthContext } from "../../context/AuthContext";

const PageLogin = ({navigation}) => {

      const {login} = useContext(AuthContext);

      return(
            <View style={styles.container}>
            <Text>Hello world - Azure Login</Text>
            {/* <Button title="Login"
            onPress={() => instance.loginRedirect(loginRequest)}/> */}
            
            {/* <Button mode="outlined" onPress= {() => navigation.navigate('AppNav', {screen: 'CreateCharacter'})}>Login</Button> */}
            <Button mode="outlined" onPress= {() => {login()}}>Login</Button>
            
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