import { View, StyleSheet, Image, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import { Text, Card, Avatar, IconButton } from 'react-native-paper';

const PageHome = () => {

    const [mood, setMood] = useState(0);
    const [picsource, setPicsource] = useState(require('../../../assets/smile.png'));

    useEffect(
        () => {
            changePic()
        },
        [mood]
    )

    const changePic = async () => {
        if (mood > 7) {
            setPicsource(require('../../../assets/smile.png'))
        } else if (mood < 7 && mood > 4) {
            setPicsource(require('../../../assets/42901.png'))
        } else if (mood < 4) {
            setPicsource(require('../../../assets/scared.png'))
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Home</Text>
            <Image style={styles.pic} source={picsource} />
            <Button title='+' onPress={() => setMood(mood + 1)}></Button>
            <Button title='-' onPress={() => setMood(mood - 1)}></Button>
            <Text>{mood}</Text>
            <Card.Title
                title="Get up and do something"
                subtitle="Card Subtitle"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => <IconButton {...props} icon="more-vert" onPress={() => { }} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        paddingTop: 55,
        //justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    pic: {
        marginTop: 55,
        width: 150,
        height: 150
    }

})
export default PageHome;
