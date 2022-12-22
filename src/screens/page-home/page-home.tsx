import { View, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Text, Card, Avatar, IconButton } from "react-native-paper";
import Moodbooster from "../../components/moodbooster/moodbooster";
import Modal from "react-native-modal";
import Moodperson from '../../../assets/moodperson.svg';

import StartupMood from "../../components/PopUps/StartupMood";
import {
  useMoodPoints,
  useMoodPointsUpdate,
} from "../../components/PopUps/MoodPointsContext";
import * as Notifications from "expo-notifications";
import { NameContext } from "../../context/NameContext";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { getUser } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import ChallengeFriends from "../../components/challengeFriends/challengeFriends";

const PageHome = ({ navigation }) => {
  const { name } = React.useContext(NameContext);

  const [picsource, setPicsource] = useState(
    require("../../../assets/smiley.png")
  );
  const wave = require("../../../assets/wave.png");

  const [mood, setMood] = useState(10);

  const userMood = async () => {
    var userData = await getUser(accessToken);
    console.log(userData);
    setMood(userData.mood);
    changePic(userData.mood);
  };

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    userMood();
  }, []);

  const changePic = async (userMood) => {
    if (userMood > 7) {
      setPicsource(require("../../../assets/smiley.png"));
    } else if (userMood < 7 && userMood > 4) {
      setPicsource(require("../../../assets/neutral.png"));
    } else if (userMood < 4) {
      setPicsource(require("../../../assets/frowney.png"));
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <StartupMood changeMood={userMood} />
      <View style={styles.top}>
        <ImageBackground source={wave} style={styles.wave}>
          <View style={styles.homeTop}>
            <Text style={styles.heading2}>{name}</Text>
            {/* <Image style={styles.pic} source={picsource}/> */}
            
            <View style={styles.moodcontainer}>
              <Image
                style={styles.moodbg}
                source={require("../../../assets/moodbg2.png")}
              />
              <Text style={styles.moodnmbr}>{mood}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.moodboostertop}>
        <Text style={styles.moodtitle}>Today's moodboosters</Text>
        <ChallengeFriends />
      </View>
      <Moodbooster changeMood={userMood} />
    </View>
  );
};

const styles = StyleSheet.create({
  // styling here
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  moodboostertop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 4,
  },
  moodcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    },
  moodtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#031D29",
  },
  moodnmbr: {
    position: "absolute",
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    zIndex: 3,
    textAlign: "center",
    marginBottom: 20,
  },
  moodbg: {
    zIndex: 2,
    position: "relative",
    width: 70,
    resizeMode: "contain",
    marginTop: 8
  },
  pic: {
    resizeMode: "contain",
  },
  top: {
    height: "50%",
  },
  wave: {
    height: "95%",
  },
  heading2: {
    fontSize: 24,
    margin: 8,
    fontFamily: "Poppins_600SemiBold",
    color: "#031D29",
  },
  homeTop: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default PageHome;
