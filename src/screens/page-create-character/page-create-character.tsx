import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
// import "@vaadin/login/vaadin-login-form.js";

const PageCharacter = ({ navigation }) => {

    const [name, setName] = React.useState("");

    return (
        <View style = {styles.screen}>
            <Text style = {styles.heading1}>Welcome</Text>
            <Image style={styles.charpic} source={require('../../../assets/smile.png')}/>
            <View style={styles.container}>
                <View style={styles.nameinput}>
                    <TextInput style={{backgroundColor: '#BBD8F1'}} theme={{ colors: {
                            text: 'black', primary: 'black', underlineColor:'transparent'
                            }}} mode="outlined" label="Name" value={name} onChangeText={name => setName(name)} /></View>
                            <View style={styles.button}>
                <Button textColor="black" mode="outlined" onPress={() => navigation.navigate('App', {screen: 'Home'})}>Complete</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 30
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
        marginTop: 30,
        marginBottom: 30
    },
    container: {
        paddingBottom: 250
    }
})
export default PageCharacter;
