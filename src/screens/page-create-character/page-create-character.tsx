import React, { useContext, useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, List, TextInput } from 'react-native-paper';
import { AuthContext } from "../../context/AuthContext";
import { NameContext } from "../../context/NameContext";
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import {
    setUserExpoPushToken
} from "../../services/NotificationService";
import {
    getAllUsers
} from "../../services/userService";
// import "@vaadin/login/vaadin-login-form.js";

const PageCharacter = ({ navigation }) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const users = [List];
    const [currentUser, setCurrentUser] = useState('');
    const [Test, SetTest] = useState('');

    const { logout } = useContext(AuthContext);
    const { setName } = React.useContext(NameContext);

    useEffect(() => {
        registerForPushNotification().then(token => console.log(token));

        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //   setNotification(notification);
        // });

        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //   console.log(response);
        // });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    async function registerForPushNotification() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status != 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

            // finalStatus = status;
        }
        if (status !== 'granted') {
            alert('Failed to get push token for push notification!');
            setCurrentUser("null");
            // console.log("SOMETHING", something.id);

            return;
        }
        const something = ( JSON.parse(await SecureStore.getItemAsync("User")));
        setCurrentUser(something.id);
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);

        

        for (let userObject of await getAllUsers()) {
            if( userObject.id == currentUser){
                console.log("already has code")
                return;
            }
            else{
                setUserExpoPushToken(expoPushToken);
            }
            return 
        }
    }


        return (
            <View style={styles.screen}>
                <Text>Your user token: {currentUser}</Text>
                <Text>Your expo token: {expoPushToken}</Text>
                {/* <Text style = {styles.heading1}>Welcome</Text> */}
                <Image style={styles.welcome} source={require('../../../assets/welcome.png')} />
                <View style={styles.nameinput}>
                    <TextInput style={{ backgroundColor: '#BBD8F1' }} theme={{
                        colors: {
                            text: 'black', primary: 'black', underlineColor: 'transparent'
                        }
                    }} mode="outlined" label="Name" onChangeText={name => setName(name)} /></View>
                <Button style={styles.btn} textColor="black" mode="outlined" onPress={() => navigation.navigate('App', { screen: 'Home' })}>Next</Button>
                <Button style={styles.btn} textColor="black" mode="outlined" onPress={() => { logout() }}>Logout</Button>
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
        nameinput: {
            marginTop: 16,
            marginBottom: 16,
            borderRadius: 99,
    },
    })

    export default PageCharacter;
