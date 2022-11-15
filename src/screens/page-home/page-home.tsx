import {
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  Pressable,
  TextInput,
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
import { NameContext } from "../../../context/NameContext";

const PageHome = () => {
  // const [name, setName] = useState("John Doe");
  const { name } = React.useContext(NameContext);
  const [mood, setMood] = useState(10);
  const [picsource, setPicsource] = useState(
    require("../../../assets/smile.png")
  );
  const wave = require("../../../assets/wave.svg");

  useEffect(() => {
    changePic();
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

  return (
    <View style={styles.screen}>
      <View style={styles.homeTop}>
        <ImageBackground
          source={wave}
          resizeMode="cover"
          style={styles.wave}
        ></ImageBackground>
        <Image style={styles.pic} source={picsource} />
        <Pressable style={styles.btn} onPress={() => setMood(mood + 1)}>
          <Text>+</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setMood(mood - 1)}>
          <Text>-</Text>
        </Pressable>
        <Text>{mood}</Text>
        <Text>{name}</Text>
      </View>
      <Text>Moodboosters</Text>

      {/* <nameContext.Consumer>
        {name => {
          return <Text style={styles.name}>{name}</Text>
        }}
      </nameContext.Consumer> */}
      {/* <TextInput
        style={{ backgroundColor: "#BBD8F1" }}
        theme={{
          colors: {
            text: "black",
            primary: "black",
            underlineColor: "transparent",
          },
        }}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(name) => setName(name)}
      /> */}
      <Moodbooster />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
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
    position: "absolute",
    height: "70%",
    width: "100%",
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
    flex: 1,
    // alignSelf: 'stretch',
    // flexDirection: "row",
    // width: 200,
    // justifyContent: 'center',
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 8,
  },
});
export default PageHome;
