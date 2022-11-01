import { View, StyleSheet, Image, Button, ImageBackground, Pressable } from 'react-native';
import React, { useState, useEffect } from "react";
import { Text, Card, Avatar, IconButton } from 'react-native-paper';
import { blue100, green100, white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import Moodbooster from '../../components/moodbooster/moodbooster';

const PageHome = () => {

    const [mood, setMood] = useState(10);
    const [picsource, setPicsource] = useState(require('../../../assets/smile.png'));
    const wave = require('../../../assets/wave.svg');

    useEffect(
        () => {
            changePic()
        },
        [mood]
    )

    const changePic = async () => {
        if (mood > 7) {
            setPicsource(require('../../../assets/happy.svg'))
        } else if (mood < 7 && mood > 4) {
            setPicsource(require('../../../assets/neutral.svg'))
        } else if (mood < 4) {
            setPicsource(require('../../../assets/frowney.svg'))
        }
    }

    return (
        
        <View style={styles.screen}>
            <ImageBackground source={wave} resizeMode="cover" style={styles.wave}></ImageBackground>
            <Image style={styles.pic} source={picsource} />
            <Pressable style={styles.btn} onPress={() => setMood(mood + 1)}><Text>+</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => setMood(mood - 1)}><Text>-</Text></Pressable>
            <Text>{mood}</Text>
            <Text>Moodboosters</Text>
            {/* <Card.Title
                title="Get up and do something"
                subtitle="Card Subtitle"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => <IconButton {...props} icon="more-vert" onPress={() => { }} />}
            /> */}
            <Moodbooster/>
        </View>
    )
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        // // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    pic: {
        marginTop: 16,
        width: 150,
        height: 150
    },
    wave: {
        position: 'absolute',
        height: '50%',
        width: '100%',
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 25,
        width: 25,
        textAlign: 'center',
        backgroundColor: '#F1F1F1',
        color: 'white',
        padding: 16,
        margin: 16,
        borderRadius: 4,
    },
    heading2: {
        fontSize: 28,
        paddingTop: 16,
        paddingBottom: 16,
        fontWeight: 'bold'
    }
})
export default PageHome;
