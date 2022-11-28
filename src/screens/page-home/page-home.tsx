import {
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Text, Card, Avatar, IconButton } from "react-native-paper";
import {
  blue100,
  green100,
  white,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import Moodbooster from "../../components/moodbooster/moodbooster";
import { AuthContext } from "../../context/AuthContext";
import StartupMood from "../../components/PopUps/StartupMood";
import { useMoodPoints, useMoodPointsUpdate } from "../../components/PopUps/MoodPointsContext";
import * as Notifications from 'expo-notifications'
import { NameContext } from "../../context/NameContext";
import { useFonts, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

const PageHome = ({ navigation }) => {
  const {name} = React.useContext(NameContext);

// const mo = useMoodPoints()

  // const [mood, setMood] = useState(10);
  const [picsource, setPicsource] = useState(
    require("../../../assets/smiley.png")
  );
  const wave = require("../../../assets/wave.png");  
  

// const points = useMood

const mood = useMoodPoints()
const updateMood = useMoodPointsUpdate()

  useEffect(() => {
    changePic()
    // console.log("name", navigation.getParams('name'))
  }, [mood]);

  const changePic = async () => {
    if (mood > 7) {
      setPicsource(require("../../../assets/smiley.png"));
    } else if (mood < 7 && mood > 4) {
      setPicsource(require("../../../assets/neutral.png"));
    } else if (mood < 4) {
      setPicsource(require("../../../assets/frowney.png"));
    }
  };
  function changeMood(moodValue) {
    console.log(moodValue)
    updateMood(mood + moodValue);
  }
  
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <StartupMood />
      <ImageBackground source={wave} style={styles.wave}>
        <View style={styles.homeTop}>
        <Text style={styles.heading2}>{name}</Text>
          <Image style={styles.pic} source={picsource} />
          <View style={styles.moodcontainer}>
            <Image style={styles.moodbg} source={require("../../../assets/moodbg.png")} />
            <Text style={styles.moodnmbr}>{mood}</Text>
          </View>
          
        </View>
      </ImageBackground>
      <Moodbooster onComplete={changeMood}/>
    </View>
  );
};


const styles = StyleSheet.create({

  // styling here
  screen: {
      // flex: 1,
      backgroundColor: "white",
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
    },
    moodcontainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
    },
    moodnmbr: {
      position: "absolute",
      fontSize: 35,
      fontWeight: "bold",
      color: "#FFFFFF",
      zIndex: 3,
      textAlign: "center",
      marginBottom: 8
    },
    moodbg: {
      zIndex: 2,
      position: "relative",
      width: 82,
      height: 74,
    },
    pic: {
      margin: 8,
      width: 150,
      height: 150,
    },
    wave: {
      height: undefined,
      width: "100%",
      resizeMode: "center"
    },
    heading2: {
      fontSize: 24,
      margin: 8,
      fontFamily: 'Poppins_600SemiBold',
      color: "#031D29",
    },
    homeTop: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default PageHome;
