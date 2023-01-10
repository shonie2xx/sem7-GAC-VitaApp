import { View, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Text, Card, Avatar, IconButton } from "react-native-paper";
import Moodbooster from "../../components/moodbooster/moodbooster";
import Modal from "react-native-modal";
import Moodperson from "../../../assets/moodperson.svg";
import Moodperson_sad from "../../../assets/moodperson_sad.svg";
import Moodperson_neutral from "../../../assets/moodperson_neutral.svg";

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
import { MoodboosterContext } from "./moodboosterContext";

const PageHome = ({ navigation }) => {
  const { name } = React.useContext(NameContext);
  const [moodboosterRequests, setMoodboosterRequests] = useState(0);
  const [picsource, setPicsource] = useState(
    require("../../../assets/moodperson.svg")
  );
  const wave = require("../../../assets/wave.png");

  const [mood, setMood] = useState(10);

  const userMood = async () => {
    var userData = await getUser(accessToken);
    // console.log(userData);
    setMood(userData.mood);
  };

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    userMood();
  }, []);

  const ChangePic = () => {
    const userMoodConditions = mood
    if (userMoodConditions > 7) {
      return <Moodperson />;
    } else if (userMoodConditions <= 7 && userMoodConditions >= 4) {
      return <Moodperson_neutral />;
    } else if (userMoodConditions < 4)  {
      return <Moodperson_sad />;
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
    <MoodboosterContext.Provider value={ {moodboosterRequests, setMoodboosterRequests} }>
    <View style={styles.screen}>
      <StartupMood changeMood={userMood}/>
      <View style={styles.top}>
        <ImageBackground source={wave} style={styles.wave}>
          <View style={styles.homeTop}>
            <Text style={styles.heading2}>{name}</Text>
            <ChangePic/>
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
    </MoodboosterContext.Provider>
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
    // margin: 8,
    marginTop: -16,
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
    marginTop: 8,
  },
  pic: {
    marginTop: 18,
  },
  top: {
    height: "50%",
  },
  wave: {
    height: "95%",
  },
  heading2: {
    fontSize: 24,
    marginTop: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#031D29",
  },
  homeTop: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});

export default PageHome;
