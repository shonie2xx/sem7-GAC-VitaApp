import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';


const Footer = () => {
    return (
        <View style={styles.footer}>
            
            <View style={styles.navigation}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-sharp/24/000000/home.png'}}></Image>
                <Text style={styles.text}>Feed</Text>
            </View>
            <View style={styles.navigation}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-sharp/24/000000/home.png'}}></Image>
                <Text style={styles.text}>Home</Text>
            </View>
            <View style={styles.navigation}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-sharp/24/000000/home.png'}}></Image>
                <Text style={styles.text}>Friends</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
        width: '100%',
        padding: 15,
        backgroundColor: '#F1F1F1',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        position: 'absolute',
        bottom: 0,
    },
    text: {
        textAlign: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    navigation: {
        flex: 1,
        padding: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default Footer;