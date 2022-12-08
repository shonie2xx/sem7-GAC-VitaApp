import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
// import { HStack, Banner, Button } from "@react-native-material/core";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

// import { EventCards } from "../../components/NewsPage/EventCards";
const wave = require("../../../assets/wave.png");

const PageEvent = ({ navigation, props}) => {

  const [events, setTodos] = useState([
    {
      id: 1,
      title: "Marble race",
      description: "This is a mockup event. In this event employees can participate in a marble race",
      date: "22 feb",
      isSigned: true,
      joined: 17,
      limit: 30
    },
    {
      id: 2,
      title: "Group fitness",
      description: "This is a mockup event. In this event employees can participate in a marble race",
      date: "18 feb",
      isSigned: false,
      joined: 19,
      limit: 30
    },
    {
      id: 3,
      title: "Hotdog contest",
      description: "This is a mockup event. In this event employees can participate in a marble race",
      date: "13 feb",
      isSigned: false,
      joined: 19,
      limit: 30
    },
  ]);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }


  
  const RightContent = (date: any) => <Text>{date}</Text>

  const wave = require("../../../assets/wave.png");  

  const handleOnPress = (item: any) => {
    navigation.navigate('Event Details', {item})
  }

  return (
      <ScrollView style={styles.screen}>
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
      <ImageBackground source={wave} style={styles.wave} />
      </ImageBackground>
      <View>
        {events.map((item, index) => (
          // <Surface style={styles.surface} elevation={1} key={index} >
          
          <Card style={styles.surface} elevation={1} key={index}>
            <TouchableOpacity style={styles.touchcard} onPress={() => handleOnPress(item)} >
             <Card.Title title={item.title} subtitle={item.description} right={() => RightContent(item.date)} />
             </TouchableOpacity>
            <Card.Content>
              <Text>{item.joined}/{item.limit}</Text>
              <IconButton
                   {...props}
                    mode="outlined"
                    icon="account-plus"
                    onPress={() => {}}
                  />
              </Card.Content>
            <Card.Actions>
              {item.isSigned ? <Button mode="contained" onPress={() => console.log('Pressed')}>SIGN OUT</Button> : <Button>SIGN IN</Button>}
            </Card.Actions>
          </Card>
          
        ))}
      </View>
      </ScrollView>
  )
}

export default PageEvent;



const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
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
  touchcard: {

  },
  wave: {
    height: undefined,
    width: "100%",
    resizeMode: "center"
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



