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
import ProfilePic from "../../../assets/moodperson_neutral.svg";
import Bg from "../../../assets/wave.svg";
import {
  Query,
  useMutation,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "react-query";
import TertiaryBtn from "../../components/buttons/TertiaryBtn";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PageFriends = () => {
  const { accessToken } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const [otherPeople, setOtherPeople] = useState([]);

  const currentUser = useQuery("currentUser", async () =>
    JSON.parse(await SecureStore.getItemAsync("User"))
  );

  const queryClient = useQueryClient();

  const friends: any = useQuery("friends", () => getFriends(accessToken), {
    onError: (error) => {
      console.log("friends get req error", error);
    },
  });

  const invites: any = useQuery(
    "invites",
    () => getSendedRequests(accessToken),
    {
      onError: (error) => {
        console.log("invites request error", error);
      },
    }
  );

  const users: any = useQuery("users", () => getAllUsers(accessToken), {
    enabled: !!currentUser && !!friends.data && !!invites.data,
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

  const mutation = useMutation((id) => addFriend(accessToken, id));
  const mutationCancelInvites = useMutation((id) =>
    cancelFrRequest(accessToken, id)
  );
  const mutationDeleteFriend = useMutation( (id) => removeFriend(accessToken, id))

  const sendInvite = async (id) => {
    try {
      const oldInvited = [...invites.data];
      const oldOtherPeople = [...otherPeople];
      const newOtherPeople = otherPeople.filter((user) => user.id !== id);
      const newInvited = await getSendedRequests(accessToken);
      
      queryClient.setQueryData(["invites"], newInvited);
      setOtherPeople(newOtherPeople);

      mutation.mutate(id, {
        onError: (error) => {
          console.log("error", error);
          queryClient.setQueryData(["invites"], oldInvited);
          queryClient.setQueryData(["invites"], oldInvited);
          setOtherPeople(oldOtherPeople);
        },
        onSuccess: () => queryClient.invalidateQueries("invites"),
      });
    } catch (err) {
      console.log("Adding friend failed", err);
    }
  };

  const deleteFriend = async (friend) => {
    try {
      //const res = await removeFriend(accessToken, id);

      const oldFriends = [...friends.data];
      const oldOtherPeople = [...otherPeople];

      console.log(friend);
      const newOtherPeople = [...oldOtherPeople, users.data.find((user) => user.id === friend.userId)];
      const newFriends = oldFriends.filter( (user) => user.id !== friend.id);
      
      setOtherPeople(newOtherPeople)
      queryClient.setQueryData(["friends"], newFriends);
      
      mutationDeleteFriend.mutate(friend.id, {
        onError: (error) => {
          console.log("error", error);
          queryClient.setQueryData(["friends"], oldFriends);
          setOtherPeople(oldOtherPeople);
        },
      })
      
    } catch (err) {
      console.log("can't remove friend", err);
    }
  };

  const cancelInvite = async (userInvite) => {
    try {
      const oldInvited = [...invites.data];
      const oldOtherPeople = [...otherPeople];

      const user_users = users.data.find( (user) => user.id === userInvite.friendId);
      const newOtherPeople = [...otherPeople, user_users];

      let newInvited = [];
      
      newInvited = oldInvited.filter((user) => user.friendId !== userInvite.friendId);
      
      queryClient.setQueryData(["invites"], newInvited);
      setOtherPeople(newOtherPeople);

      mutationCancelInvites.mutate(userInvite.id, {
        onError: (error) => {
          console.log("error", error);
          queryClient.setQueryData(["invites"], oldInvited);
          queryClient.setQueryData(["invites"], oldInvited);
          setOtherPeople(oldOtherPeople);
        },
      });
      
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
            onRefresh={() => queryClient.invalidateQueries()}
          />
        }
      >
        {/* <Image style={styles.pfp} source={require("../../../assets/pfp.png")} /> */}
        <Bg style={styles.wave}/>
        <View>
          <Text style={styles.title}>Friends</Text>
          {!friends.isLoading ? (
            friends.data.map((item, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <Image
                      style={styles.pfp}
                      source={require("../../../assets/pfp.png")}
                    />
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <TertiaryBtn
                    text={"REMOVE"}
                    onPress={() => deleteFriend(item.id)}
                  ></TertiaryBtn>
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
          {!invites.isLoading ? (
            invites.data.map((item, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.wrapperTop}>
                  <View style={styles.joined}>
                    <Image
                      style={styles.pfp}
                      source={require("../../../assets/pfp.png")}
                    />
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <SecondaryBtn
                    text={"CANCEL"}
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
                    <Image
                      style={styles.pfp}
                      source={require("../../../assets/pfp.png")}
                    ></Image>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>

                  <PrimaryBtn
                    text={"INVITE"}
                    onPress={() => sendInvite(item.id)}
                  ></PrimaryBtn>
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
    borderRadius: 8,
    backgroundColor: "white",
  },
  joined: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#052D40",
    paddingLeft: 12,
    width: "70%",
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
