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
import { styles } from "./home-style";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';

const PageHome = ({ navigation }) => {

  const {name} = React.useContext(NameContext);


// const mo = useMoodPoints()

  // const [mood, setMood] = useState(10);
  const [picsource, setPicsource] = useState(
    require("../../../assets/smile.png")
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
      setPicsource(require("../../../assets/happy.svg"));
    } else if (mood < 7 && mood > 4) {
      setPicsource(require("../../../assets/neutral.svg"));
    } else if (mood < 4) {
      setPicsource(require("../../../assets/frowney.svg"));
    }
  };
  function changeMood(moodValue) {
    console.log(moodValue)
    updateMood(mood + moodValue);
  }

  return (
    <View style={styles.screen}>
      <StartupMood />
      <ImageBackground source={wave} style={styles.wave}>
        <View style={styles.homeTop}>
        <Text style={styles.heading2}>{name}</Text>
          <Image style={styles.pic} source={picsource} />
          {/* <Pressable style={styles.btn} onPress={() => updateMood(mood + 1)}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => updateMood(mood - 1)}>
            <Text>-</Text>
          </Pressable> */}
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

export default PageHome;
