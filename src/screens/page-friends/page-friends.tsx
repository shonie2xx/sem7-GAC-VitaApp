import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Pressable, SafeAreaView, RefreshControl } from "react-native";
import {
  Card,
  Button,
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { addFriend, getFriends, getSendedRequests, removeFriend } from "../../services/friendsService";
import { getAllUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { __handlePersistedRegistrationInfoAsync } from "expo-notifications/build/DevicePushTokenAutoRegistration.fx";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const { accessToken } = useContext(AuthContext);

  //const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([])
  const [otherPeople, setOtherPeople] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    handleData();
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(accessToken);
      //setUsers(res);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFriends = async () => {
    try {
      const res = await getFriends(accessToken);
      //setFriends(res);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSendedRequests = async () => {
    try {
      const res = await getSendedRequests(accessToken);
      return res;
    } catch (err) {
      console.log("sended requests failed with :", err)
    }
  }

  const handleData = async () => {
    // fetch all data

    const fetchedUsers = await fetchUsers();
    const fetchedFriends = await fetchFriends();

    const fetchedSendedRequests = await fetchSendedRequests();
    // check for users and filter friends and non friends
    if (fetchedUsers.length > 0) {
      const withoutFriends = fetchedUsers.filter(user => !fetchedFriends.includes(user.id)) // filter friends from users
      if (withoutFriends.length > 0) {
        const toRemove = fetchedSendedRequests.map(item => item.friendId);
        const filteredRequests = withoutFriends.filter(obj => !toRemove.includes(obj.id))
        setOtherPeople(filteredRequests);
      } else {
        setOtherPeople(withoutFriends);
      }
    }
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }
  
  const handleAddFriends = async (id: any) => {
    try {
      const res = await addFriend(accessToken, id);
      console.log("response add friend", res.status)
      if(res.ok)  {
        //alert
        
        //filter other people array
        setOtherPeople(otherPeople.filter(user => user.id !== id)); // filter friends from users
        
      }
      // console.log(res.status)
    } catch (err) {
      console.log("Adding friend failed", err)
    }
  }

  const handleRemoveFriend = async (id) => {
    try {
      const res = await removeFriend(accessToken, id);
      if (res.status === 200) {
        //alert

        //filter friends array
        setFriends(friends.filter(item => item.id !== id))
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.screen}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleData}
          />
        }
      >
        <ImageBackground source={wave} style={styles.wave} />
        <View>
          <Text style={styles.title}>Friends</Text>
          {
            friends.length ?
              friends.map((item, index) => (
                <Card style={styles.surface} elevation={1} key={index}>
                  <Card.Title title={item.name} />
                  <Card.Actions>
                    <Button mode="contained" onPress={() => handleRemoveFriend(item.id)}>REMOVE</Button>
                  </Card.Actions>
                </Card>
              ))
              :
              <Text>No friends yet! Make some friends by sending a friend request!</Text>}
        </View>

        <View>
          <Text style={styles.title}>Other people</Text>
          {otherPeople.length
            ?
            otherPeople.map((item, index) => (
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
            ))
            :
            <Text>No users</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
  },
});
