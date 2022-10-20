import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { loginRequest } from "../../../auth.config";
import { useMsal } from "@azure/msal-react";
import "@vaadin/login/vaadin-login-form.js";
import { Flex } from "@react-native-material/core";

const PageCharacter = ({ navigation }) => {

    const [name, setName] = React.useState("");

    return (
        <View style = {styles.screen}>
            <Text style = {styles.heading1}>Welcome</Text>
            <Image style={styles.charpic} source={require('../../../assets/smile.png')}/>
            <TextInput style={styles.nameinput} mode="flat" label="Name" value={name} onChangeText={name => setName(name)} />
            <View style={styles.button}>
                <Button  mode="outlined" onPress={() => navigation.navigate('Home')}>Complete</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%'
    },
    charpic: {
        width: 100,
        height: 100,
        marginTop: 30,
        marginBottom: 30
    },
    heading1: {
    fontSize: 40,
    paddingTop: 120,
    fontFamily: 'Poppins',
    fontWeight: 'bold'
    },
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameinput :{
        marginTop: 10,
        marginBottom: 30
    }
})
export default PageCharacter;
