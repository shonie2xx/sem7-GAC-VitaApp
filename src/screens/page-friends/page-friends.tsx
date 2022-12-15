import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Pressable, SafeAreaView, RefreshControl, Image } from "react-native";
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
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const { accessToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([])
  const [notFriends, setNotFriends] = useState([]);
  const [isFriends, setIsFriends] = useState(false);
  const [isNotFriends, setIsNotFriends] = useState(false);
  const [sendedRequests, setSendedRequests] = useState([]);
  // const [friendsRequests, setUsersStateRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    handleData();
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(accessToken);
      setUsers(res);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFriends = async () => {
    try {
      const res = await getFriends(accessToken);
      setFriends(res);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSendedRequests = async () => {
    try { 
      const res = await getSendedRequests(accessToken);
      setSendedRequests(res);
      console.log("sended requests: ", res)
    } catch (err) {
      console.log("sended requests failed with :", err)
    }
  }

  const handleData = async () => {
    await fetchUsers();
    await fetchFriends();
    await fetchSendedRequests();
    if(users.length > 0) {
    const newNotFriends = users.filter(user => !friends.includes(user.id))
      setNotFriends(newNotFriends);
      console.log("people who are not friends: ", newNotFriends);
    }
    if(sendedRequests.length > 0) { 
      const newNotFriends = notFriends.filter(user => !sendedRequests.includes(user.name))
      setNotFriends(newNotFriends);
      console.log("people I have not sended requests to: ", newNotFriends);
    }
    await checkFriendsLenght();
    await checkNotFriendsLength();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }

  const checkFriendsLenght = async () => {
    if (friends.length === 0) {
      setIsFriends(false);
    } else {
      setIsFriends(true);
    }
  }
  const checkNotFriendsLength = async () => {
    if (notFriends.length === 0) {
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
        setFriends(friends.filter(item => item.id !== id))
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.screen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleData} />
        }
      >
        <ImageBackground source={wave} style={styles.wave} />
        <View>
          <Text style={styles.title}>Friends</Text>
          {isFriends ? (
            friends.map((item, index) => (
              <Card style={styles.surface} elevation={1} key={index}>
                <Card.Title title={item.name} />
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => handleRemoveFriend(item.id)}
                  >
                    REMOVE
                  </Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text>
              No friends yet! Make some friends by sending a friend request!
            </Text>
          )}
        </View>

        <View>
          <Text style={styles.title}>Other people</Text>
          {isNotFriends ? (
            notFriends.map((item, index) => (
              <Card style={styles.surface} elevation={1} key={index}>
                <Card.Title title={item.name} />
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => handleAddFriends(item.id)}
                  >
                    Add
                  </Button>
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
          ) : (
            <Text>No users</Text>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.wrapperTop}>
            <View style={styles.joined}>
              <Image style={styles.pfp} source={require("../../../assets/pfp.png")}></Image>
              <Text style={styles.title}>{"Username"}</Text>
            </View>

            <SecondaryBtn text={"REMOVE"}></SecondaryBtn>
          </View>
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
  pfp: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 999,
    backgroundColor: "green",
  },
  screen: {
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 999,
    backgroundColor: "white",
  },
  joined: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    margin: 0,
    padding: 0,
    fontSize: 18,
    color: "#052D40",    
    paddingLeft: 12,
  },
  description: {
    fontFamily: "Poppins_500Medium",
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: "#052D40",
    paddingVertical: 4,
  },
  date: {
    fontFamily: "Poppins_700Bold",
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: "#031D29",
  },
  icon: {
    marginHorizontal: 8,
  },
  wave: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  wrapperTop: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: 8,
  },
  wrapperBottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 4,
  },
  moodtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    marginVertical: 8,
    color: "#031D29",
    paddingLeft: 20,
  },
  btnPrimary: {
    backgroundColor: "#419FD9",
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  btnSecondary: {},
  buttontext: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    margin: 8,
    color: "white",
  },
});
