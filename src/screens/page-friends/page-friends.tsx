import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Pressable } from "react-native";
import {
  Card,
  Button,
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState, useContext } from "react";
import { addFriend, getFriends, removeFriend } from "../../services/friendsService";
import { getAllUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { __handlePersistedRegistrationInfoAsync } from "expo-notifications/build/DevicePushTokenAutoRegistration.fx";

const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const { accessToken } = useContext(AuthContext);

  const [usersState, setUsersState] = useState([]);
  const [friendsState, setFriendsState] = useState([])
  const [notFriendsState, setNotFriendsState] = useState([]);
  const [isFriends, setIsFriends] = useState(false);
  const [isNotFriends, setIsNotFriends] = useState(false);
  // const [friendsRequests, setUsersStateRequests] = useState([]);

  useEffect(() => {
    handleData();
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(accessToken);
      setUsersState(res);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFriends = async () => {
    try {
      const res = await getFriends(accessToken);
      setFriendsState(res);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const handleData = async () => {
    const users = await fetchUsers();
    const friends = await fetchFriends();
  
    if(users.length > 0) {
    const notFriends = users.filter(user => !friends.includes(user.id))
      setNotFriendsState(notFriends);
    }

    await checkFriendsLenght();
    await checkNotFriendsLength();
  }

  const checkFriendsLenght = async () => {
    if (friendsState.length === 0) {
      setIsFriends(false);
    } else {
      setIsFriends(true);
    }
  }
  const checkNotFriendsLength = async () => {
    if (notFriendsState.length === 0) {
      setIsNotFriends(false);
    } else {
      setIsNotFriends(true);
    }
  }
  const handleAddFriends = async (id: any) => {
    try {
      const res = await addFriend(accessToken, id);
      if(res.length > 0) {
        //alert
        
        //filter not friends list
        
        console.log(res)
      }
      // console.log(res.status)
    } catch (err) {
      console.log("Adding friend failed", err)
    }
  }

  const handleRemoveFriend = async (id) => {
    try {
      const res = await removeFriend(accessToken, id);
      if(res.status === 200) {
        setFriendsState(friendsState.filter(item => item.id !== id))
        await checkFriendsLenght()
      }
    } catch (err) {
      console.log("can't remove friend", err);
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
          
          <Text style={styles.title}>Friends</Text>
          {isFriends ? friendsState.map((item, index) => (
            <Card style={styles.surface} elevation={1} key={index}>
              <Card.Title title={item.name} />
              <Card.Actions>
                <Button mode="contained" onPress={() => handleRemoveFriend(item.id)}>REMOVE</Button>
              </Card.Actions>
            </Card>
          )) : <Text>No friends yet! Make some friends by sending a friend request!</Text>}


        </View>
        
        <View>
          <Text style={styles.title}>Other people</Text>
          {isNotFriends ? notFriendsState.map((item, index) => (
            <Card style={styles.surface} elevation={1} key={index}>
              <Card.Title title={item.name} />
              <Card.Actions>
                <Button mode="contained" onPress={() => handleAddFriends(item.id)}>Add</Button>
                {/* {showPopup && (
                  <Dialog visible={showPopup} onDismiss={() => setShowPopup(false)}>
                  <Dialog.Title>You are sending a request</Dialog.Title>
                  
                  <Dialog.Actions>
                    <Button onPress={() => handleYesPress}>Confirm</Button>
                    <Button onPress={() => setShowPopup(false)}>Cancel</Button>
                  </Dialog.Actions>
                </Dialog>
                )} */}
              </Card.Actions>
            </Card>
          )) : <Text>No users</Text>}
        </View> 
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
