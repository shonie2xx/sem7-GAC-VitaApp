import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Pressable, SafeAreaView, RefreshControl, Image } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { addFriend, getFriends, getSendedRequests, removeFriend, cancelFrRequest } from "../../services/friendsService";
import { getAllUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { __handlePersistedRegistrationInfoAsync } from "expo-notifications/build/DevicePushTokenAutoRegistration.fx";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import * as SecureStore from 'expo-secure-store';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const { accessToken } = useContext(AuthContext);

  //const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([])
  const [otherPeople, setOtherPeople] = useState([]);
  const [invites, setInvites] = useState([]);

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
    
    const currentUser =  JSON.parse(await SecureStore.getItemAsync("User"));
    // console.log(currentUser.id);
    // check for users and filter friends and non friends
    if (fetchedUsers.length > 0) {

      const withoutFriends = fetchedUsers.filter(user => !fetchedFriends.includes(user.id) && user.id !== currentUser.id) // filter friends from users
      
      if (withoutFriends.length > 0) {
        const toRemove = fetchedSendedRequests.map(user => user.friendId);
        const filteredRequests = withoutFriends.filter(user => !toRemove.includes(user.id))
        setOtherPeople(filteredRequests);
        setInvites(fetchedSendedRequests);
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
      if (res.ok) {
        //alert

        //filter other people array
        setOtherPeople(otherPeople.filter(user => user.id !== id)); // filter friends from users
        handleData()
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

  const handleCancelRequest = async (id) => {
    try {
      const res = await cancelFrRequest(accessToken, id);
      if(res.status === 200) {
        setInvites(invites.filter(item => item.id !== id));
        handleData();
      }
    }
    catch (err) {
      console.log("request couldn't be cancelled", err)
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
                <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <Image style={styles.pfp} source={require("../../../assets/pfp.png")}></Image>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn text={"REMOVE"} press={() => handleRemoveFriend(item.id)}></SecondaryBtn>
                </View>
              </View>
              ))
              :
              <Text>No friends yet! Make some friends by sending a friend request!</Text>}
        </View>

        <View>
          <Text style={styles.title}>Invited</Text>
          {invites.length
            ?
            invites.map((item, index) => (

              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <Image style={styles.pfp} source={require("../../../assets/pfp.png")}></Image>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn text={"Cancel"} press={() => handleCancelRequest(item.id)}></SecondaryBtn>
                </View>
              </View>
            ))
            : (
              <Text>No invitations sended</Text>
            )}
            </View>
        <View>
          <Text style={styles.title}>Other people</Text>
          {otherPeople.length
            ?
            otherPeople.map((item, index) => (

              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <Image style={styles.pfp} source={require("../../../assets/pfp.png")}></Image>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn text={"INVITE"} press={() => handleAddFriends(item.id)}></SecondaryBtn>
                </View>
              </View>
            ))
            : (
              <Text>No users</Text>
            )}
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
