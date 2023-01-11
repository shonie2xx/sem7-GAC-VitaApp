import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
  RefreshControl,
  Image,
} from "react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  addFriend,
  getFriends,
  getSendedRequests,
  removeFriend,
  cancelFrRequest,
} from "../../services/friendsService";
import { getAllUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { __handlePersistedRegistrationInfoAsync } from "expo-notifications/build/DevicePushTokenAutoRegistration.fx";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import * as SecureStore from "expo-secure-store";
import ProfilePic from "../../../assets/pfp.svg";
import Bg from "../../../assets/wave.svg";
import {
  Query,
  useMutation,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "react-query";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const { accessToken } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const [otherPeople, setOtherPeople] = useState([]);

  const currentUser = useQuery("currentUser", async () => JSON.parse(await SecureStore.getItemAsync("User")))

  const queryClient = useQueryClient();
  
  const friends: any = useQuery("friends", () => getFriends(accessToken), {
    onError: (error) => {
      console.log("friends get req error", error);
    },
  });
  
  const invites : any = useQuery("invites", () => getSendedRequests(accessToken), {
    onError: (error) => {
      console.log("invites request error", error);
    },
  });
  
  const users : any = useQuery("users", () => getAllUsers(accessToken), {
    enabled: (!!currentUser && !!friends.data && !!invites.data),
    onSuccess: (users) => {
      //const currentUser = JSON.parse(await SecureStore.getItemAsync("User"));
      const otherPeps = users.filter(
        (user) =>
          !friends.data.find((friend) => friend.friendId == user.id) &&
          !invites.data.find((invite) => invite.friendId == user.id) &&
          user.id !== currentUser.data.id
      );
      //console.log("other people", otherPeps);
      //console.log("other people", otherPeps)
      setOtherPeople(otherPeps);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  
  const mutation = useMutation((id) => addFriend(accessToken ,id))
  const mutationCancelInvites = useMutation( (id) => cancelFrRequest(accessToken, id))

  const sendInvite = async (id) => {
    try {
      const oldInvited = [...invites.data]
      const oldOtherPeople = [...otherPeople]
      
      const newOtherPeople = otherPeople.filter((user) => user.id !== id);
      //console.log("new other people", newOtherPeople);

      let newInvited = [];
      if(Array.isArray(invites.data)) {
        newInvited = [...invites.data, otherPeople.find(user => user.id == id)];
        //console.log(" new invited: ", newInvited);
      }
      else {
        newInvited = [...newInvited, otherPeople.find(user => user.id == id)];
      }
    
      //console.log("new invited", newInvited)
      //const res = useMutation("friends",  )

      queryClient.setQueryData(["invites"], newInvited)
      setOtherPeople( newOtherPeople);

      mutation.mutate (id, {
        onError: (error) => {
          console.log("error", error);
          queryClient.setQueryData(["invites"], oldInvited)
          setOtherPeople(oldOtherPeople);
        }
      })
    } catch (err) {
      console.log("Adding friend failed", err);
    }
  };

  const deleteFriend = async (id) => {
    try {
      const res = await removeFriend(accessToken, id);

      //filterarrays();

      if (res.status === 200) {
      }
    } catch (err) {
      console.log("can't remove friend", err);
    }
  };


  const cancelInvite = async (userInvite) => {
  
    try {
      const oldInvited = [...invites.data]
      const oldOtherPeople = [...otherPeople]
      
      const newOtherPeople = [...otherPeople, userInvite];

      console.log("comes to function user invite " + JSON.stringify(userInvite))
      //const newInvites = [];
      let newInvited = [];
      console.log("old invited", oldInvited)

      console.log("E GO", oldInvited.map((user) => user.id === userInvite.id))
      oldInvited.map((user) => {
        if (user.id === userInvite.id) {
          newInvited = oldInvited.filter((user) => user.id !== userInvite.id)
          mutationCancelInvites.mutate (userInvite.id, {
            onError: (error) => {
              console.log("error", error);
              queryClient.setQueryData(["invites"], oldInvited)
              setOtherPeople(oldOtherPeople);
            }})
        } else if (user.id === userInvite.friendId) {
          newInvited = oldInvited.filter((user) => user.id !== userInvite.friendId)
          mutationCancelInvites.mutate (userInvite.friendId, {
            onError: (error) => {
              console.log("error", error);
              queryClient.setQueryData(["invites"], oldInvited)
              setOtherPeople(oldOtherPeople);
            }})
        } else if (user.friendId === userInvite.id) {
          newInvited = oldInvited.filter((user) => user.friendId !== userInvite.id)
          mutationCancelInvites.mutate (userInvite.id, {
            onError: (error) => {
              console.log("error", error);
              queryClient.setQueryData(["invites"], oldInvited)
              setOtherPeople(oldOtherPeople);
            }})
        } else if (user.friendId === userInvite.friendId) {
          newInvited = oldInvited.filter((user) => user.friendId !== userInvite.friendId);
          mutationCancelInvites.mutate (userInvite.friendId, {
            onError: (error) => {
              console.log("error", error);
              queryClient.setQueryData(["invites"], oldInvited)
              setOtherPeople(oldOtherPeople);
            }})
        }
      })
      
      queryClient.setQueryData(["invites"], newInvited)
      setOtherPeople(newOtherPeople);

      
    } catch (err) {
      console.log("Cancel friend invite failed", err);
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
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
            onRefresh={queryClient.invalidateQueries}
          />
        }
      >
        <Bg style={styles.wave} />
        <View>
          <Text style={styles.title}>Friends</Text>
          {!friends.isLoading ? (
            friends.data.map((item, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <ProfilePic />
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn
                    text={"REMOVE"}
                    onPress={() => deleteFriend(item.id)}
                  ></SecondaryBtn>
                </View>
              </View>
            ))
          ) : (
            <Text>
              No friends yet! Make some friends by sending a friend request!
            </Text>
          )}
        </View>

        <View>
          <Text style={styles.title}>Invited</Text>
          {!users.isLoading ? (
            users.data.map((item, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <ProfilePic />
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn
                    text={"Cancel"}
                    onPress={() => cancelInvite(item)}
                  ></SecondaryBtn>
                </View>
              </View>
            ))
          ) : (
            <Text>No invitations sended</Text>
          )}
        </View>
        <View>
          <Text style={styles.title}>Other people</Text>
          {otherPeople.length > 0 ? (
            otherPeople.map((item, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <ProfilePic />
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn
                    text={"INVITE"}
                    onPress={() => sendInvite(item.id)}
                  ></SecondaryBtn>
                </View>
              </View>
            ))
          ) : (
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
    fontFamily: "Poppins_600SemiBold",
  },
  touchcard: {},
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
    position: "absolute",
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
