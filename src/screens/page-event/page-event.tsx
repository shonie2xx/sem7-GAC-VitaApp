
import { Surface } from "react-native-paper";
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, } from "react-native";
// import { HStack, Banner, Button } from "@react-native-material/core";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph,

} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';

// import { EventCards } from "../../components/NewsPage/EventCards";
const wave = require("../../../assets/wave.png");

const PageEvent = ({ navigation }) => {

    const [todos, setTodos] = useState([
        {
          text: "Code a website!",
          complete: true,
          points: 1,
        },
        {
          text: "Make videos!",
          complete: false,
          points: 2,
        },
        {
          text: "Make a todo list!",
          complete: false,
          points: 3,
        },
      ]);
    
      let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return null;
      }
    
      // function handleTodoClick(index) {
      //   let itemsCopy = [...todos];
      //   props.onComplete(itemsCopy[index].points);
      //   itemsCopy.splice(index, 1);
      //   setTodos(itemsCopy);
      // }
      
  return (
    <View>
      <ImageBackground source={wave} style={styles.wave}>
        <Text style={styles.title}>Signed Up</Text>
      <View>
        {todos.map((item, index) => (
          <Surface style={styles.surface} elevation={1} key={index} >
            <Card.Title
              title={item.text} titleStyle={{ fontFamily: 'Poppins_400Regular' }}
              // left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <View style={styles.buttons}>
                  <IconButton
                    {...props}
                    icon="account-plus"
                    onPress={() => {}}
                  />
                  <Button
                    mode="contained"
                    buttonColor="#419FD9"
                    labelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                    onPress={() => navigation.navigate('Event Details')}
                  >
                    See More
                  </Button>
                </View>
              )}
            />
          </Surface>
        ))}
      </View>
      <Text style={styles.title}>Open events</Text>
      </ImageBackground>
      <View>
        {todos.map((item, index) => (
          <Surface style={styles.surface} elevation={1} key={index} >
            <Card.Title
              title={item.text} titleStyle={{ fontFamily: 'Poppins_400Regular' }}
              // left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <View style={styles.buttons}>
                  <IconButton
                    {...props}
                    icon="account-plus"
                    onPress={() => {}}
                  />
                  <Button
                    mode="contained"
                    buttonColor="#419FD9"
                    labelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                    onPress={() => navigation.navigate('Event Details')}
                  >
                    See More
                  </Button>
                </View>
              )}
            />
          </Surface>
        ))}
      </View>
    </View>
  )
}

export default PageEvent;



const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

  },
  surface: {
    borderRadius: 5,
    paddingRight: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    fontFamily: 'Poppins_600SemiBold'
  },
  wave: {
    height: undefined,
    width: "100%",
    resizeMode: "center"
  },
  title: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 20, 
    margin: 8, 
    color: '#031D29', 
    paddingLeft: 16
  }
});

