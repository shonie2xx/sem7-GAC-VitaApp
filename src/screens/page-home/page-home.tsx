import {
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Text, Card, Avatar, IconButton } from "react-native-paper";
import {
  blue100,
  green100,
  white,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import Moodbooster from "../../components/moodbooster/moodbooster";

const PageHome = () => {
  const [mood, setMood] = useState(10);
  const [picsource, setPicsource] = useState(
    require("../../../assets/smile.png")
  );
  const wave = require("../../../assets/wave.png");

  useEffect(() => {
    changePic();
  }, [mood]);

  const changePic = async () => {
    if (mood > 7) {
      setPicsource(require("../../../assets/smile.png"));
    } else if (mood < 7 && mood > 4) {
      setPicsource(require("../../../assets/42901.png"));
    } else if (mood < 4) {
      setPicsource(require("../../../assets/scared.png"));
    }
  };
  function changeMood(moodValue) {
    console.log(moodValue)
    setMood(mood + moodValue);
  }

  return (
    <View style={styles.screen}>
      <ImageBackground source={wave} style={styles.wave}>
        <View style={styles.homeTop}>
          <Image style={styles.pic} source={picsource} />
          <Pressable style={styles.btn} onPress={() => setMood(mood + 1)}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => setMood(mood - 1)}>
            <Text>-</Text>
          </Pressable>
          <Text>{mood}</Text>
        </View>
      </ImageBackground>
      <Moodbooster onComplete={changeMood}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  pic: {
    marginTop: 16,
    width: 150,
    height: 150,
  },
  wave: {
    resizeMode: "cover",
    height: "55%",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 25,
    width: 25,
    textAlign: "center",
    backgroundColor: "#F1F1F1",
    color: "white",
    padding: 16,
    margin: 16,
    borderRadius: 4,
  },
  heading2: {
    fontSize: 28,
    paddingTop: 16,
    paddingBottom: 16,
    fontWeight: "bold",
  },
  homeTop: {
    // flex: 1,
    // alignSelf: 'stretch',
    // flexDirection: "row",
    // width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PageHome;
