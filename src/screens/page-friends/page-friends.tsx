import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState, useContext } from "react";
import { getFriends } from "../../services/friendsService";
import { getAllUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { __handlePersistedRegistrationInfoAsync } from "expo-notifications/build/DevicePushTokenAutoRegistration.fx";


const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const { accessToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([])
  const [notFriends, setNotFriends] = useState([]);
  const [isFriends, setIsFriends] = useState(false);

  useEffect(() => {
    handleData();
    console.log(friends)
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(accessToken);
      setUsers(res);
    } catch (err) {
      console.log(err)
    }
  }
  const fetchFriends = async () => {
    try {
      const res = await getFriends(accessToken);
      setFriends(res);
    } catch (err) {
      console.log(err)
    }
  }

  const handleData = async () => {
    await fetchUsers();
    await fetchFriends();

    if (users.length > 0) {
        const notFriends = users.filter(user => !friends.includes(user.id))
        console.log("not friends", notFriends)
        setNotFriends(notFriends);
    }
     
    if (friends.length === 0) {
      setIsFriends(false);
    } else {
      setIsFriends(true);
    }
    console.log("friends", friends)
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
      <ImageBackground source={wave} style={styles.wave}>
        <View>

          <Text style={styles.title}>Friends</Text>


          {isFriends ? friends.map((item, index) => (
            <Card style={styles.surface} elevation={1} key={index}>
              <Card.Title title={item.name} />
              <Card.Actions>
                <Button mode="contained" onPress={() => console.log('Pressed')}>REMOVE</Button>
              </Card.Actions>
            </Card>
          )) : <Text>No friends yet! Make some friends by sending a friend request!</Text>}


        </View>
        <View>
          <Text style={styles.title}>Other people</Text>
          {notFriends ? notFriends.map((item, index) => (
            <Card style={styles.surface} elevation={1} key={index}>
              <Card.Title title={item.name} />
              <Card.Actions>
                <Button mode="contained" onPress={() => console.log('Pressed')}>ADD</Button>
              </Card.Actions>
            </Card>
          )) : <Text>No users</Text>}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default PageFriends;

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
