import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  getAllActivities,
  startActivity,
  cancelActivity,
  getAllActiveActivities,
  completeActivity,
  getAllCompletedActivities,
} from "../../services/moodboosterService";

import { Card, IconButton, Button, Paragraph } from "react-native-paper";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import { AuthContext } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const Moodbooster = (mood) => {
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  //TOAST AFTER COMPLETE
  const showToast = (toastData) => {
    Toast.show({
      type: "success",
      text1: "Completed moodbooster!",
      text2: toastData.moodbooster.description,
    });
  };

  const handleActivities = async () => {
    var activeActivities = await getAllActiveActivities(accessToken);
    // console.log(activeActivities[0].activity.id);

    var activities = await getAllActivities(accessToken);
    // var completedActivities = await getAllCompletedActivities(accessToken);
    setData(await activities);
    setActiveData(await activeActivities);
    if (await activeActivities[0]) {
      setDisabledState(true);
      setLoadingState(false);
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
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleToStart = async (index) => {
    setLoadingState(true);
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
    showToast(activeData[index]);
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
        <Card
          style={styles.surface}
          mode="outlined"
          theme={{
            colors: {
              outline: "rgba(0, 0, 0, 0.2)",
            },
          }}
          key={index}
        >
          <Card.Content>
            <Paragraph style={styles.description}>
              {item.moodbooster.description}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.buttons}>
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
        <Card
          style={styles.surface}
          mode="outlined"
          theme={{
            colors: {
              outline: "rgba(0, 0, 0, 0.2)",
            },
          }}
          key={index}
        >
          <Card.Content>
            <Paragraph style={styles.description}>{item.description}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.buttons}>
            <IconButton
              mode="outlined"
              icon="account-plus"
              disabled={disabledState}
              onPress={() => {}}
            />
            <Button
              mode="contained"
              disabled={disabledState}
              loading={loadingState}
              buttonColor="#419FD9"
              labelStyle={{
                fontFamily: "Poppins_600SemiBold",
                textTransform: "uppercase",
              }}
              onPress={() => handleToStart(index)}
            >
              <Text style={styles.btntext}>Start</Text>
            </Button>
          </Card.Actions>
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
    <ScrollView>
      <ActiveCards />
      {data[0] ? (
        <MainCard />
      ) : (
        <ContentLoader
        speed={2}
        width={400}
        height={460}
        viewBox="0 0 400 460"
        backgroundColor="#e6e6e6"
        foregroundColor="#d6d6d6"
      >
        <Rect x="10" y="0" rx="2" ry="2" width="350" height="100" />
        <Rect x="10" y="110" rx="2" ry="2" width="320" height="100" />
        <Rect x="10" y="220" rx="2" ry="2" width="340" height="100" />
        </ContentLoader>
      )}
      {/* <CompletedCard />  */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  description: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#031D29",
  },
  surface: {
    // borderRadius: 20,
    // paddingHorizontal: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    fontFamily: "Poppins_600SemiBold",
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
