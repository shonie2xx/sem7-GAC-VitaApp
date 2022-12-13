import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
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
      </ImageBackground>
        <Text style={styles.moodtitle}>Signed Up</Text>
        <View>

        {events.map((item, index) => (
          <Card style={styles.surface} key={index}>
            <TouchableOpacity style={styles.touchcard} onPress={() => handleOnPress(item)} >
             <Card.Title title={item.title} subtitle={item.description} right={() => RightContent(item.date)} />
             </TouchableOpacity>
            <Card.Content style={styles.content}>
              <Text>{item.joined}/{item.limit}</Text>
              <Ionicons style={styles.icon} 
                name="people"
                size={24}
                color="#031D29" 
              />
              {/* <IconButton
                   {...props}
                    mode="outlined"
                    icon="account-plus"
                    onPress={() => {}}
                  /> */}
              </Card.Content>
            <Card.Actions>
              {item.isSigned ? <Button mode="contained" onPress={() => console.log('Pressed')}>SIGN OUT</Button> : <Button>SIGN IN</Button>}
            </Card.Actions>
          </Card>
          
        ))}
      </View>
      <Text style={styles.moodtitle}>Open events</Text>
      <View>

        {events.map((item, index) => (
          <Card style={styles.surface} key={index}>
            <TouchableOpacity style={styles.touchcard} onPress={() => handleOnPress(item)} >
             <Card.Title title={item.title} subtitle={item.description} right={() => RightContent(item.date)}/>
             </TouchableOpacity>
            <Card.Content style={styles.content}>
              <Text>{item.joined}/{item.limit}</Text>
              <Ionicons  name="person" />
              {/* <IconButton
                   {...props}
                    mode="outlined"
                    icon="account-plus"
                    onPress={() => {}}
                  /> */}
                 <Card.Actions>
                  {item.isSigned ? <Button mode="contained" onPress={() => console.log('Pressed')} style={{backgroundColor: "#419FD9"}}>SIGN OUT</Button> : <Button style={{borderWidth: 1, borderColor: "#FFE06A"}}>SIGN IN</Button>}
                </Card.Actions>
              </Card.Content>
            
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
  surface: {
    borderRadius: 8,
    padding: 8,
    margin: 8,
    fontFamily: 'Poppins_600SemiBold',
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  wave: {
    flex: 1,
    width: "100vw",
    height: "40vh",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  moodtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    margin: 8,
    color: "#031D29",
    paddingLeft: 8,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  touchcard: {
    padding: 0,
    margin: 0,
  },
  icon: {
    paddingLeft: 8,
  }
});



