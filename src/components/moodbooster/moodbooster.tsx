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
  createActivity,
  deleteActivity,
  completeActivity,
  getAllCompletedActivities,
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

<<<<<<< HEAD
const Moodbooster = (moodData) => {
=======
const Moodbooster = () => {
>>>>>>> b7001d45d5044d7efc57fd926857a680c5f88239
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);

  const handleActivities = async () => {
    var activeActivities = await getAllActiveActivities(accessToken);
    // console.log(activeActivities[0].activity.id);

    var activities = await getAllActivities(accessToken);
    // var completedActivities = await getAllCompletedActivities(accessToken);

    setData(await activities);
    setActiveData(await activeActivities);
    if (await activeActivities[0].activity.id) {
      setDisabledState(true);
    }
    // setCompletedData(await completedActivities);
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
    await startActivity(data[index].id, accessToken);
    // await deleteActivity(data[index].id, accessToken);
    setButtonState(!buttonState);
    setDisabledState(true);
  };
  const handleToComplete = async (index) => {
    // console.log(activeData[index].id, accessToken)
    await completeActivity(activeData[index].id, accessToken);
    setButtonState(!buttonState);
    setDisabledState(false);
  };
  const handleToCancel = async (index) => {
    await cancelActivity(activeData[index].id, accessToken);
    // await createActivity(activeData[index], accessToken);
    setButtonState(!buttonState);
    setDisabledState(false);
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
            right={() => (
              <View style={styles.buttons}>
                <IconButton
                  mode="outlined"
                  icon="account-plus"
                  disabled={disabledState}
                  onPress={() => {}}
                />
                <Button
                  mode="contained"
                  disabled={disabledState}
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
  const CompletedCard = () => (
    //can be used to show completed moodboosters
    <View>
      {completedData.map((item, index) => (
        <Card style={styles.surface} mode="outlined" key={index}>
          <Card.Title
            title={item.activity.title}
            subtitle={item.activity.category.source.date}
            titleStyle={{ fontFamily: "Poppins_400Regular" }}
          />
        </Card>
      ))}
    </View>
  );
  return (
    <View>
      <Text style={styles.moodtitle}>Today's moodboosters</Text>
      <ScrollView style={{ minHeight: 350, maxHeight: 350 }}>
        <ActiveCards />
        <MainCard />
        {/* <CompletedCard />  */}
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
