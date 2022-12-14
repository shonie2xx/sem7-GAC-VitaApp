import { View, Text,StyleSheet, ScrollView, ImageBackground } from "react-native";
import {
  Card,
  Button,
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { __handlePersistedRegistrationInfoAsync } from "expo-notifications/build/DevicePushTokenAutoRegistration.fx";
import { acceptFrRequest, cancelFrRequest, getFrRequests } from "../../services/friendsService";

const PageRequests = () => {
    const wave = require("../../../assets/wave.png");
    
    const { accessToken } = useContext(AuthContext);

    const [requests, setRequests] = useState([]);
    const [isRequests, setIsRequests] = useState(false);
    useEffect( () => {
      fetchRequests(); 
    }, [])

    const fetchRequests = async () => {
    try {
      const res = await getFrRequests(accessToken);
      console.log("Friend requests", requests);
      if(res.status === 200) {
      setRequests(await res.data);
      setIsRequests(true);
      }
    } catch (err) {
      console.log("couldn't fetch requests", err)
    }
  }

  const handleCancelRequest = async (id) => {
    try {
      const res = await cancelFrRequest(accessToken, id);
      await fetchRequests();
      console.log(res)
    }
    catch (err) {
      console.log("request couldn't be cancelled", err)
    }
  }

  const handleAcceptRequest = async (id) => {
    try {
      const res = await acceptFrRequest(accessToken, id);
      await fetchRequests()
      console.log("accepted", res)
    }
    catch (err) {
      console.log("request couldn't be accepted", err)
    }
  }

  let [fontsLoaded] = useFonts({
      Poppins_600SemiBold,
      Poppins_400Regular
    });
    
    if (!fontsLoaded) {
      return null;
    }

  return (
    <ScrollView style={styles.screen}>
      <ImageBackground source={wave} style={styles.wave} />
        <View>
        {isRequests ? requests.map((item, index) => (
         
          <Card style={styles.surface} elevation={1} key={index}>
            <Card.Title title={item.name} />
            <Card.Actions>
              <Button mode="contained" onPress={() => handleAcceptRequest(item.id)}>Accept</Button>
              <Button mode="contained" onPress={() => handleCancelRequest(item.id)}>Cancel</Button> 
            </Card.Actions>
          </Card>
          
        )) : <Text>No requests yet!</Text>}
      </View>
      
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
      height: "100%",
      width: "100%",
      resizeMode: "center",
      position: "absolute"
    },
    title: {
      fontFamily: 'Poppins_600SemiBold', 
      fontSize: 20, 
      margin: 8, 
      color: '#031D29', 
      paddingLeft: 16
    }
  });
  