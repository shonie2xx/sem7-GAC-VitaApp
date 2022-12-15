import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
// import { HStack, Banner, Button } from "@react-native-material/core";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";

// import { EventCards } from "../../components/NewsPage/EventCards";
const wave = require("../../../assets/wave.png");

const PageEvent = ({ navigation, props }) => {
  const [events, setTodos] = useState([
    {
      id: 1,
      title: "Marble race",
      description:
        "This is a mockup event. In this event employees can participate in a marble race.",
      date: "22 FEB",
      isSigned: true,
      joined: 17,
      limit: 30,
    },
    {
      id: 2,
      title: "Group fitness",
      description:
        "This is a mockup event. In this event employees can participate in a marble race.",
      date: "18 FEB",
      isSigned: false,
      joined: 19,
      limit: 30,
    },
    {
      id: 3,
      title: "Hotdog contest",
      description:
        "This is a mockup event. In this event employees can participate in a marble race.",
      date: "13 FEB",
      isSigned: false,
      joined: 19,
      limit: 30,
    },
  ]);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const RightContent = (date: any) => <Text>{date}</Text>;

  const wave = require("../../../assets/wave.png");

  const handleOnPress = (item: any) => {
    navigation.navigate("Event Details", { item });
  };

  return (
    <ImageBackground source={wave} style={styles.wave}>
      <ScrollView style={styles.screen}>
        <Text style={styles.moodtitle}>Signed Up</Text>

        {events.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={{ width: "100%" }}
            >
              <View style={styles.wrapperTop}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>

            <View style={styles.wrapperBottom}>
              <View style={styles.joined}>
                <Text style={styles.description}>
                  {item.joined}/{item.limit}
                </Text>
                <Ionicons
                  style={styles.icon}
                  name="people"
                  size={24}
                  color="#031D29"
                />
              </View>
              <PrimaryBtn text={"LOG IN"}></PrimaryBtn>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default PageEvent;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    backgroundColor: "white",
  },
  joined: {
    flexDirection: "row",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    margin: 0,
    padding: 0,
    fontSize: 20,
    color: "#031D29",
  },
  description: {
    fontFamily: "Poppins_500Medium",
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: "#052D40",
    paddingVertical: 4,
  },
  date: {
    fontFamily: "Poppins_700Bold",
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: "#031D29",
  },
  icon: {
    paddingHorizontal: 8,
  },
  wave: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  wrapperTop: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 4,
  },
  wrapperBottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 4,
  },
  moodtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    marginVertical: 8,
    color: "#031D29",
    paddingLeft: 20,
  },
  btnPrimary: {
    backgroundColor: "#419FD9",
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  btnSecondary: {},
  buttontext: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    margin: 8,
    color: "white",
  },
});
