import { Surface } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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
      text: "Code a website!",
      complete: "Start",
      points: 1,
    },
    {
      text: "Make videos!",
      complete: "Start",
      points: 2,
    },
    {
      text: "Make a todo list!",
      complete: "Start",
      points: 3,
    },
  ]);
  const [data, setData] = useState([]);

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
    //send stuff to back end and update front end.
    let itemsCopy = [...todos];
    // props.onComplete(itemsCopy[index].points);
    // itemsCopy.splice(index, 1);
    itemsCopy[index].complete = "Complete";
    // console.log(todos[index].complete)
    setTodos(itemsCopy);
  }

  return (
    <View>
      <Text
        style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20, margin: 10 }}
      >
        Moodboosters
      </Text>
      <View>
        {data.map((item, index) => (
          <Card style={styles.card} mode="outlined" key={index}>
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
                    onPress={() => handleTodoClick(index)}
                  >
                    Start
                  </Button>
                </View>
              )}
            />
          </Card>
        ))}
      </View>
      {/* <View style={{ flex: 1, padding: 24 }}>
        <FlatList
          // data={data.id}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View> */}
      {/* <div className="item-container">
        {data.map((product) => (
          <div className="card"></div>
        ))}
      </div> */}
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
  card: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 6,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default Moodbooster;
