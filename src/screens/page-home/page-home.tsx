import { View, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Text, Card, Avatar, IconButton } from "react-native-paper";
import Moodbooster from "../../components/moodbooster/moodbooster";

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

const PageHome = ({ navigation }) => {
  const { name } = React.useContext(NameContext);

  const [picsource, setPicsource] = useState(
    require("../../../assets/smiley.png")
  );
  const wave = require("../../../assets/wave.png");

  const [mood, setMood] = useState(1);

  const userMood = async () => {
    var userData = await getUser(accessToken);
    console.log(userData);
    setMood(userData.mood)
  };

  // const mood = useMoodPoints()
  const updateMood = useMoodPointsUpdate();
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    changePic();
    userMood();
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
      <StartupMood changeMood={userMood}/>
      <ImageBackground source={wave} style={styles.wave}>
        <View style={styles.homeTop}>
          <Text style={styles.heading2}>{name}</Text>
          <Image style={styles.pic} source={picsource} />
          <View style={styles.moodcontainer}>
            <Image
              style={styles.moodbg}
              source={require("../../../assets/moodbg.png")}
            />
            <Text style={styles.moodnmbr}>{mood}</Text>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.moodtitle}>Today's moodboosters</Text>
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
  moodcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  moodtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    margin: 8,
    color: "#031D29",
    paddingLeft: 8,
  },
  moodnmbr: {
    position: "absolute",
    fontSize: 35,
    fontWeight: "bold",
    color: "#FFFFFF",
    zIndex: 3,
    textAlign: "center",
    marginBottom: 8,
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
    resizeMode: "center",
  },
  heading2: {
    fontSize: 24,
    margin: 8,
    fontFamily: "Poppins_600SemiBold",
    color: "#031D29",
  },
  homeTop: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PageHome;
