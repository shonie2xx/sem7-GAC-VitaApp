import { View, Text,StyleSheet, ScrollView, ImageBackground } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useState } from "react";

const PageRequests = () => {
    const wave = require("../../../assets/wave.png");
    
    
    const [requests, setRequests] = useState([
        {
          id: 1,
          name: "John Doe",
        },
        {
          id: 2,
          name: "John Doe",
        },
        {
          id: 3,
          name: "John Doe",
        },
      ]);
      let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <ScrollView style={styles.screen}>
      <ImageBackground source={wave} style={styles.wave}>
        <View>
        {requests.map((item, index) => (
         
          <Card style={styles.surface} elevation={1} key={index}>
            <Card.Title title={item.name} />
            <Card.Actions>
               <Button mode="contained" onPress={() => console.log('Pressed')}>REMOVE</Button> 
            </Card.Actions>
          </Card>
          
        ))}
      </View>
      </ImageBackground>
      </ScrollView>
  );
};

export default PageRequests;

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
    title: {
      fontFamily: 'Poppins_600SemiBold', 
      fontSize: 20, 
      margin: 8, 
      color: '#031D29', 
      paddingLeft: 16
    }
  });
  