import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from "../../context/AuthContext";
import { NameContext } from "../../context/NameContext";
// import "@vaadin/login/vaadin-login-form.js";

const PageCharacter = ({ navigation }) => {

    const {logout} = useContext(AuthContext);
    const {setName} = React.useContext(NameContext);
    
    return (
        <View style = {styles.screen}>
            {/* <Text style = {styles.heading1}>Welcome</Text> */}
            <Image style={styles.welcome} source={require('../../../assets/welcome.png')}/>
                <View style={styles.nameinput}>
                            <TextInput style={{backgroundColor: '#BBD8F1'}} theme={{ colors: {
                            text: 'black', primary: 'black', underlineColor:'transparent'
                            }}} mode="outlined" label="Name" onChangeText={name => setName(name)} /></View>
                <Button style={styles.btn} textColor="black" mode="outlined" onPress={() => navigation.navigate('App', {screen: 'Home'})}>Next</Button>
                <Button style={styles.btn} textColor="black" mode="outlined" onPress={() => {logout()}}>Logout</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 32,
    },
    btn: {
        marginBottom: 16,
    },
    welcome: {
        height: "60%",
        resizeMode: "contain",
    },
    nameinput :{
        marginTop: 16,
        marginBottom: 16,
    },
})

export default PageCharacter;
