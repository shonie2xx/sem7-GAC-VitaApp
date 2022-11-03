import { Surface } from "react-native-paper";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { HStack, Banner, Button } from "@react-native-material/core";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";


const Moodbooster = (props) => {


  const [todos, setTodos] = useState([
    {
      text: "Code a website!",
      complete: true,
      id: 1,
    },
    {
      text: "Make videos!",
      complete: false,
      id: 2,
    },
    {
      text: "Make a todo list!",
      complete: false,
      id: 3,
    },
  ]);
  function handleTodoClick(index) {
    let itemsCopy = [...todos];
    itemsCopy.splice(index, 1);
    setTodos(itemsCopy);
  }

  return (
    <div>
      <p>Moodboosters</p>
      <div>
        {todos.map((item, index) => (
          <Surface style={styles.surface} elevation={1} key={index}>
            <Card.Title
              title={item.text}
              subtitle=""
              // left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <View style={styles.buttons}>
                  <IconButton
                    {...props}
                    icon="account-plus"
                    onPress={() => {}}
                  />
                  <Button mode="outlined" onPress={() => handleTodoClick(index)}>Done</Button>
                </View>
              )}
            />
          </Surface>
        ))}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  surface: {
    paddingRight: 10,
    margin: 10,
  },
});

export default Moodbooster;
