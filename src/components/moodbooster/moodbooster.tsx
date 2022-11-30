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
import { getAllActivities } from "../../services/moodboosterService";
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
  const [todos, setTodos] = useState([
    {
      text: "Code a website with a nice codebase",
      complete: false,
      started: false,
      points: 1,
    },
    {
      text: "Make videos!",
      complete: false,
      started: false,
      points: 2,
    },
    {
      text: "Make a todo list!",
      complete: false,
      started: false,
      points: 3,
    },
    {
      text: "Make a todo list!",
      complete: false,
      started: false,
      points: 3,
    },
    {
      text: "Make a todo list!",
      complete: false,
      started: false,
      points: 3,
    },
  ]);
  const [data, setData] = useState([]);
  const [buttonState, setButtonState] = useState("");

  const handleActivities = async () => {
    var activities = await getAllActivities(accessToken);
    // console.log(activities);
    setData(await activities);
    console.log(data);
  };
  useEffect(() => {
    handleActivities();
  }, []);
  const { accessToken } = useContext(AuthContext);

  //protectedResources.apiActivity.endpoint

  const [cardState, setCardState] = useState();

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  function handleTodoClick(index) {
    todos[index].started = true;
    //send stuff to back end and update front end.
    let itemsCopy = [...todos];
    // props.onComplete(itemsCopy[index].points);
    // itemsCopy.splice(index, 1);
    // itemsCopy[index].complete = "Complete";
    // console.log(todos[index].complete)
    setTodos(itemsCopy);
  }
  function handleToComplete(index) {
    todos[index].complete = true;
    let itemsCopy = [...todos];
    props.onComplete(itemsCopy[index].points);
    itemsCopy.splice(index, 1);
    // itemsCopy[index].complete = "Complete";
    // console.log(todos[index].complete)
    setTodos(itemsCopy);
  }
  function handleToCancel(index) {
    todos[index].started = false;
    let itemsCopy = [...todos];
    setTodos(itemsCopy);
  }

  const MainCard = () => (
    <View>
      <ScrollView style={{ maxHeight: 350 }}>
        {todos.map((item, index) => (
          <View>
            {todos[index].started || (
              <Card style={styles.surface} mode="outlined" key={index}>
                <Card.Title
                  title={item.text}
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
                        onPress={() => handleTodoClick(index)}
                      >
                        <Text style={styles.btntext}>Start</Text>
                      </Button>
                    </View>
                  )}
                />
              </Card>
            )}
            {todos[index].started && (
              <Card style={styles.surface} mode="outlined" key={index}>
                <Card.Title
                  title={item.text}
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
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View>
      <Text style={styles.moodtitle}>Today's moodboosters</Text>
      <MainCard />
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
    flex: 1
  }
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
