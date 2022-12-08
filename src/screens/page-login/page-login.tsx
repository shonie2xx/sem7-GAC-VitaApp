import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, ResponseType } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { checkUser, getUser } from "../../services/userService";
import {AuthContext} from "../../context/AuthContext";
import * as Linking from "expo-linking";
import { updateShorthandPropertyAssignment } from "typescript";

WebBrowser.maybeCompleteAuthSession();


const PageLogin = () => {
  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/913b1a98-9696-4db5-b548-9e17b6d3fc68/v2.0');

  const url = Linking.useURL();
  
  // Authentication Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '50f18b4e-1a58-4004-b6b8-5a15e3a2e863',
      scopes: ['openid', 'profile', 'email', 'offline_access', "api://82b5a9e1-eaa2-4ee8-a3a0-7d3c41a4a1b5/User.All"],
      redirectUri: makeRedirectUri({
        // scheme: process.env.NODE_ENV === 'production' ?  'exp://145.93.177.134:19000' : ''
        scheme : url
      }),
    },
    discovery
  );

  // Save values under keys in SecurStore
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("key", key)
    console.log("value", value)
  }

  const {login} = useContext(AuthContext);

  const handleLogin = async (token) => {
    var firstLogin = await checkUser(token);
    save("FirstLogin", JSON.stringify(firstLogin)); //stringified because it gives an error message
    var user = await getUser(token);
    save("User", JSON.stringify(user)) // user= id, nam, ... , mood
    login(token)
}

  React.useEffect(() => {
    console.log("url",url)
    if (response && response.type === 'success') {
      
      const access_token = response.params.access_token;

      if(access_token != null) {
        console.log("access_token: ", access_token);
        handleLogin(access_token)
      }
      else {
        // handle redirect error
       alert("Auth not working at the moment. Please try again later")
      }
      
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>Azure Login</Text>

      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }} />

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