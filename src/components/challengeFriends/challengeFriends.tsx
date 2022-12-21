import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import TertiaryBtn from "../buttons/TertiaryBtn";
import { Card } from "react-native-paper";
import { getAllCompletedActivities } from "../../services/moodboosterService";
import { AuthContext } from "../../context/AuthContext";
import { getFriends } from "../../services/friendsService";

const challengeFriends = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [completedData, setCompletedData] = useState([]);
  const { accessToken } = useContext(AuthContext);
  // const [dataState, setDataState] = useState(false);
  const [friends, setFriends] = useState([]);
  const [moodboosterRequests, setMoodboosterRequests] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleActivities = async () => {
    // var completedActivities = await getAllCompletedActivities(accessToken);
    // console.log(completedActivities[0].moodbooster);
    // setCompletedData(await completedActivities);
    await fetchFriends();
  };
  const fetchFriends = async () => {
    try {
      const res = await getFriends(accessToken);
      setFriends(res);
      if (res.length === 0) {
        setMoodboosterRequests(0);
      }
      else {
        setMoodboosterRequests(res);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleActivities();
  }, []);

  const CompletedCard = () => (
    //can be used to show completed moodboosters

    <ScrollView>
      {friends.map((item, index) => (
        <Card style={styles.surface} mode="outlined" key={index}>
          <Card.Title
            subtitle={item.moodbooster.description}
            title={item.moodbooster.title}
            titleStyle={{ fontFamily: "Poppins_400Regular" }}
          />
        </Card>
      ))}
    </ScrollView>
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.friendsbtn}>
        <Text style={styles.buttontext}>{moodboosterRequests}</Text>
        <Ionicons style={styles.icon} name="people" size={24} color="#052D40" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.friendsModal}>
          <Text style={styles.friendstitle}>Invite friends</Text>
          <View style={styles.friendslist}>
            <CompletedCard />
          </View>
          <TertiaryBtn text="DONE" onPress={toggleModal} />
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
    // backgroundColor: "gray",
    marginVertical: 16,
    width: "100%",
    height: "80%",
  },
  friendstitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#031D29",
  },
  surface: {
    marginHorizontal: 8,
    marginVertical: 8,
    fontFamily: "Poppins_600SemiBold",
    backgroundColor: "#FFFFFF",
  },
});
