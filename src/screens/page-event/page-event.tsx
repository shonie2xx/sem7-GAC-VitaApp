import React, { useContext, useEffect, useState } from "react";
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

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { getEvents, joinEvent, leaveEvent } from "../../services/eventService";

import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
// import { EventCards } from "../../components/NewsPage/EventCards";
const wave = require("../../../assets/wave.png");

const PageEvent = ({ navigation, props }) => {
  //const [events, setEvents] = useState([]);
  const wave = require("../../../assets/wave.png");
  const { accessToken } = useContext(AuthContext);
  const [isJoined, setIsJoined] = useState(false);

  const [notJoinedEvents, setNotJoinedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    try {
      const currentUser = JSON.parse(await SecureStore.getItemAsync("User"));
      console.log(currentUser);
      if(currentUser !== null)
      getEvents(accessToken)
        .then((res) => res.data)
        .then((data) => {

          //console.log(data);
          data.forEach(element => {
            if(element.userIds.includes(currentUser.id) && !joinedEvents.includes(element.id))
            {
              setJoinedEvents([...joinedEvents, element])
              console.log("joinedEvents", joinedEvents);
            } 
            else if (!notJoinedEvents.includes(element.id)){
              console.log("")
              console.log(" is event here", notJoinedEvents.includes(element.id))
              setNotJoinedEvents([...notJoinedEvents, element])
              console.log("not joinedEvents", notJoinedEvents);
            }
          })
            
          });
        //   data.map(event => {
        //     if(event.userIds.includes(currentUser.id) && !joinedEvents.includes(event.id)){
        //     setJoinedEvents([...joinedEvents, { event } ])
        //     //console.log("joined", data);
        //     }
        //     else if(!notJoinedEvents.includes(event.id)){
        //     setNotJoinedEvents([...notJoinedEvents, {event}])
        //     console.log("not joined", notJoinedEvents);
        //     }
        //   });
        //   // console.log(data);
        // });
    } catch (err) {
      console.log("error fetching events : ", err);
    }
  };

  const parseDate = (dateString) => {
    // Parse the date string using the Date constructor
    const date = new Date(dateString);

    // Use the getDate method to get the day
    const day = date.getDate();

    // Use the toLocaleString method to get the month and year
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });

    // Use the toLocaleString method to get the time
    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Use string formatting to add the "th"
    const formattedDate = `${day}${
      day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
    } ${month} ${year} at ${time}`;

    return formattedDate;
  };

  const handleOnPress = (item: any) => {
    navigation.navigate("Event Details", { item });
  };

  const handleJoinEvent = async (id) => {
    const response = await joinEvent(accessToken, id);
    if (response.status === 200) {
      // alert

      // refresh
      console.log("event joined");
      handleData();
    }
  };

  const handleLeaveEvent = async (id) => {
    const response = await leaveEvent(accessToken, id);
    if (response.status === 200) {
      // alert

      // refresh
      console.log("event left");
      handleData();
    }
  };

  // const checkJoinedEvents = async (event_id) => {
  //   const currentUser = JSON.parse(await SecureStore.getItemAsync("User"));
  //   events.forEach((event) => {
  //     if (event.id === event_id) {
  //       if (event.userIds.includes(currentUser.id)) {
  //         console.log(event_id, "event is joined");
  //         return true;
  //       } else {
  //         console.log(event_id, "event is not joined");
  //         return false;
  //       }
  //     }
  //   });
  // };
  // fonts
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={wave} style={styles.wave}>
      <ScrollView style={styles.screen}>
        <Text style={styles.moodtitle}>Signed Up</Text>
        {joinedEvents.length ? joinedEvents.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={{ width: "100%" }}
            >
              <View style={styles.wrapperTop}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{parseDate(item.date)}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>

            <View style={styles.wrapperBottom}>
              <View style={styles.joined}>
                {/* <Text style={styles.description}>{item.userIds.length}/20</Text> */}
                <Ionicons
                  style={styles.icon}
                  name="people"
                  size={24}
                  color="#031D29"
                />
              </View>
              <PrimaryBtn
                  text={"LEAVE"}
                  onPress={() => handleLeaveEvent(item.id)}
                ></PrimaryBtn>
            </View>
          </View>
        )) : <Text>Haven't signed up for events yet.</Text>}
    <Text style={styles.moodtitle}>Available</Text>
    {notJoinedEvents ? notJoinedEvents.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={{ width: "100%" }}
            >
              <View style={styles.wrapperTop}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{parseDate(item.date)}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>

            <View style={styles.wrapperBottom}>
              <View style={styles.joined}>
                {/* <Text style={styles.description}>{item.userIds.length}/20</Text> */}
                <Ionicons
                  style={styles.icon}
                  name="people"
                  size={24}
                  color="#031D29"
                />
              </View>
              <PrimaryBtn
                  text="Join"
                  onPress={() => handleJoinEvent(item.id)}
                ></PrimaryBtn>
            </View>
          </View>
        )) : <Text>No events to join!</Text>}
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
