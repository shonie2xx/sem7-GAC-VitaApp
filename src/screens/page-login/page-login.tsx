import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, ResponseType } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';

const PageLogin = ({ navigation }) => {
  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/913b1a98-9696-4db5-b548-9e17b6d3fc68/v2.0');

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '50f18b4e-1a58-4004-b6b8-5a15e3a2e863',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: makeRedirectUri({
        scheme: 'exp://145.93.177.103:19000'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response && response.type === 'success') {
      //const auth = response.params;
      //const storageValue = JSON.stringify(auth);
      //SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, storageValue);

      const token = response.params.access_token
      SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, token);

      console.log(token);
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