import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { loginRequest } from "../../../auth.config";
import { useMsal } from "@azure/msal-react";
// import "@vaadin/login/vaadin-login-form.js";

const PageCharacter = ({ navigation }) => {

    const [name, setName] = React.useState("");

    return (
        <View style = {styles.screen}>
            <Text style = {styles.heading1}>Welcome</Text>
            <Image style={styles.charpic} source={require('../../../assets/smile.png')}/>
            <View style={styles.nameinput}>
            <TextInput style={{backgroundColor: '#BBD8F1'}} theme={{ colors: {
                    text: 'black', primary: 'black', underlineColor:'transparent'
                    }}} mode="flat" label="Name" value={name} onChangeText={name => setName(name)} /></View>
            <View style={styles.button}>
                <Button textColor="black" icon="arrow-forward" mode="outlined" onPress={() => navigation.navigate('Home')}>Complete</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '70%',
        paddingTop: 90
    },
    charpic: {
        width: 100,
        height: 100,
        marginTop: 30,
        marginBottom: 30
    },
    heading1: {
    fontSize: 40,
    paddingTop: 100,
    paddingBottom: 30,
    fontWeight: 'bold'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameinput :{
        width: '80%',
        marginTop: 30,
        marginBottom: 30
    }
})
export default PageCharacter;
