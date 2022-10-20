import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

// state = { active: null };
// console.log(state);

// const toPage1 = (state) => {
//     state.setState({ active: 0 })
//     style={ this.state.active === 0 ? styles.pressableActive | styles.pressable }
//     console.log(state);
// }

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Pressable onPress={() => { }} style={styles.pressable}>
                <View style={styles.navigation}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-sharp/24/000000/home.png'}}></Image>
                    <Text style={styles.text}>Feed</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => { }} style={styles.pressable}>
                <View style={styles.navigation}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-sharp/24/000000/home.png'}}></Image>
                    <Text style={styles.text}>Home</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => { }} style={styles.pressable}>
                <View style={styles.navigation}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-sharp/24/000000/home.png'}}></Image>
                    <Text style={styles.text}>Friends</Text>
                </View>
            </Pressable>  
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
        zIndex: 99,
    },
    text: {
        textAlign: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    navigation: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressableActive: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    }
  });

export default Footer;