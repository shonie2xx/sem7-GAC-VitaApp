import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import TertiaryBtn from "../buttons/TertiaryBtn";
import { AuthContext } from "../../context/AuthContext";
import { getFriends } from "../../services/friendsService";
import { getAllMoodboosterRequests } from "../../services/moodboosterService";
import { declineMoodboosterRequest } from "../../services/moodboosterService";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { Card, Paragraph, IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

const challengeFriends = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [completedData, setCompletedData] = useState([]);
  const [mount, setMount] = useState(false);
  const { accessToken } = useContext(AuthContext);
  // const [dataState, setDataState] = useState(false);
  const [friends, setFriends] = useState([]);
  const [moodboosterRequests, setMoodboosterRequests] = useState(0);

  const cancelledToast = (toastData) => {
    Toast.show({
      type: "error",
      text1: "Declined invitation from " + toastData,
    });
  };
  const acceptedToast = (toastData) => {
    Toast.show({
      type: "info",
      text1: "Accepted invitation from " + toastData,
    });
  };

  const toggleModalOn = () => {
    setModalVisible(!isModalVisible);
    setMount(!mount);
  };
  const toggleModalOff = () => {
    setModalVisible(!isModalVisible);
  };
  const handleActivities = async () => {
    const fetchedMoodboosterRequests = await fetchMoodboosterRequests();
    // console.log(fetchedMoodboosterRequests);
    setFriends(fetchedMoodboosterRequests);
  };
  const handleToDecline= async (user) => {
    const decline = await declineMoodboosterRequest(user.inviteId, accessToken)
    cancelledToast(user.inviterName);
    handleActivities();
  };
  const handleToAccept= async (user) => {

    acceptedToast(user.inviterName);
  };
  const fetchMoodboosterRequests = async () => {
    try {
      const res = await getAllMoodboosterRequests(accessToken);

      console.log(res);
      if (res.length === 0) {
        setMoodboosterRequests(0);
      } else {
        setMoodboosterRequests(res.length);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleActivities();
  }, []);

  const FriendsList = () => (
    <ScrollView>
      {friends.map((item, index) => (
        <Card
          style={styles.surface}
          mode="outlined"
          theme={{
            colors: {
              outline: "rgba(0, 0, 0, 0.2)",
            },
          }}
          key={index}
        >
          <Card.Content>
            {/* <Image style={styles.pfp} source={require("../../../assets/pfp.png")}></Image> */}
            <Paragraph style={styles.description}>{item.inviterName}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.buttons}>
            <PrimaryBtn
              text={"ACCEPT"}
              onPress={() => handleToAccept(item)}
            ></PrimaryBtn>
            <SecondaryBtn
              text={"DECLINE"}
              onPress={() => handleToDecline(item)}
            ></SecondaryBtn>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleModalOn} style={styles.friendsbtn}>
        <Text style={styles.buttontext}>{moodboosterRequests}</Text>
        <Ionicons style={styles.icon} name="people" size={24} color="#052D40" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.friendsModal}>
          <Text style={styles.friendstitle}>Moodbooster invitations</Text>
          <View style={styles.friendslist}>
            <FriendsList />
          </View>
          <TertiaryBtn text="DONE" onPress={toggleModalOff} />
        </View>
      </Modal>
    </View>
  );
};

export default challengeFriends;

const styles = StyleSheet.create({
  buttontext: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    marginLeft: 8,
    color: "#052D40",
  },
  friendsbtn: {
    flexDirection: "row",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  icon: {
    paddingHorizontal: 8,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  friendsModal: {
    alignItems: "center",
    padding: 18,
    width: "100%",
    height: "80%",
    borderRadius: 8,
    backgroundColor: "white",
  },
  friendslist: {
    marginVertical: 16,
    width: "100%",
    height: "80%",
  },
  friendscard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  friendstitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#031D29",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#052D40",
    paddingLeft: 12,
    width: "70%",
  },
  joined: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 8,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    backgroundColor: "white",
  },
  wrapperTop: {
    // flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: 8,
  },
  pfp: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 999,
    backgroundColor: "green",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  description: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#031D29",
  },
  surface: {
    marginHorizontal: 8,
    marginVertical: 8,
    fontFamily: "Poppins_600SemiBold",
    backgroundColor: "#FFFFFF",
  },
  btntext: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
  },
  container: {
    flex: 1,
  },
});
