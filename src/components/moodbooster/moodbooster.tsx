import { Surface } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  LayoutAnimation,
} from "react-native";
import {
  getAllActivities,
  startActivity,
  cancelActivity,
  getAllActiveActivities,
  acceptActivity,
  createActivity,
  deleteActivity
} from "../../services/moodboosterService";

// import { HStack, Banner, Button } from "@react-native-material/core";
import axios from "axios";
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

import { protectedResources } from "../../../authConfig";
import { AuthContext } from "../../context/AuthContext";

const Moodbooster = (props) => {

  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  const handleActivities = async () => {
    var activeActivities = await getAllActiveActivities(accessToken);
    var activities = await getAllActivities(accessToken);
    // console.log(activeActivities);
    setData(await activities);
    setActiveData(await activeActivities);
  };
  useEffect(() => {
    handleActivities();
  }, [buttonState]);
  const { accessToken } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleToStart = async (index) => {
    // await acceptActivity(data[index].id, accessToken);
    await deleteActivity(data[index].id, accessToken);
    setButtonState(!buttonState);
  };
  const handleToComplete = async (index) => {
    setButtonState(!buttonState);
  };
  const handleToCancel = async (index) => {
    await cancelActivity(activeData[index].id, accessToken);
    await createActivity(activeData[index], accessToken);
    setButtonState(!buttonState);
  };

  const ActiveCards = () => (
    <View>
      {activeData.map((item, index) => (
        <Card style={styles.surface} mode="outlined" key={index}>
          <Card.Title
            title={item.activity.title}
            titleStyle={{ fontFamily: "Poppins_400Regular" }}
          />
          <Card.Actions>
            <IconButton
              {...props}
              mode="outlined"
              icon="account-plus"
              onPress={() => {}}
            />
            <Button
              mode="outlined"
              textColor="#FA9901"
              labelStyle={{
                fontFamily: "Poppins_600SemiBold",
                textTransform: "uppercase",
                // color: "#FA9901"
              }}
              onPress={() => handleToCancel(index)}
            >
              <Text style={styles.btntext}>Cancel</Text>
            </Button>
            <Button
              mode="contained"
              buttonColor="#419FD9"
              labelStyle={{
                fontFamily: "Poppins_600SemiBold",
                textTransform: "uppercase",
              }}
              onPress={() => handleToComplete(index)}
            >
              <Text style={styles.btntext}>Complete</Text>
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
  const MainCard = () => (
    <View>
      {data.map((item, index) => (
          <Card style={styles.surface} mode="outlined" key={index}>
            <Card.Title
              title={item.title}
              titleStyle={{ fontFamily: "Poppins_400Regular" }}
              right={(props) => (
                <View style={styles.buttons}>
                  <IconButton
                    {...props}
                    mode="outlined"
                    icon="account-plus"
                    onPress={() => {}}
                  />
                  <Button
                    mode="contained"
                    buttonColor="#419FD9"
                    labelStyle={{
                      fontFamily: "Poppins_600SemiBold",
                      textTransform: "uppercase",
                    }}
                    onPress={() => handleToStart(index)}
                  >
                    <Text style={styles.btntext}>Start</Text>
                  </Button>
                </View>
              )}
            />
          </Card>
      ))}
    </View>
  );

  return (
    <View>
      <Text style={styles.moodtitle}>Today's moodboosters</Text>
      <ScrollView style={{ maxHeight: 350 }}>
        <ActiveCards />
        <MainCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  moodtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    margin: 8,
    color: "#031D29",
    paddingLeft: 16,
  },
  surface: {
    borderRadius: 8,
    // paddingHorizontal: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    fontFamily: "Poppins_600SemiBold",
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
  },
  btntext: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
  },
  container: {
    flex: 1,
  },
});

export default Moodbooster;

// {todos[index].started &&(

//   <Card.Actions >
//     <Button
//         mode="outlined"
//         textColor="#FA9901"
//         labelStyle={{
//           fontFamily: "Poppins_600SemiBold",
//           textTransform: "uppercase",
//           // color: "#FA9901"

//         }}
//         onPress={() => handleToCancel(index)}
//       >
//         <Text style={styles.btntext}>Cancel</Text>
//       </Button>
//   </Card.Actions>
// )}
