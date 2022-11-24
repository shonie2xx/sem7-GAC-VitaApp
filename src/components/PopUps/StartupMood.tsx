import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { useMoodPoints, useMoodPointsUpdate } from "./MoodPointsContext";

const StartupMood = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const mood = useMoodPoints()
  const updateMood = useMoodPointsUpdate()

  function updateMoodPopUp(points) {
    setModalVisible(!modalVisible);
    updateMood(points)
    console.log(points)
  };

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>How are we feeling today?</Text>
          <View style={{ flexDirection: "row" }}>
              <Button
                  style={styles.btn}
                  mode="contained"
                  buttonColor="#419FD9"
                  labelStyle={{ fontFamily: 'Poppins_600SemiBold' }} onPress={() => updateMoodPopUp(1)}>
                  <Image source={require("../../../assets/modal_frowney.png")} style={styles.emoji}/>
              </Button>
              <Button
                  style={styles.btn}
                  mode="contained"
                  buttonColor="#419FD9"
                  labelStyle={{ fontFamily: 'Poppins_600SemiBold' }} onPress={() => updateMoodPopUp(5)}>
                  <Image source={require("../../../assets/modal_neutral.png")} style={styles.emoji}/>
              </Button>
              <Button
                  style={styles.btn}
                  mode="contained"
                  buttonColor="#419FD9"
                  labelStyle={{ fontFamily: 'Poppins_600SemiBold' }} onPress={() => updateMoodPopUp(10)}>
                  <Image source={require("../../../assets/modal_happy.png")} style={styles.emoji}/>
              </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16
  },
  modalView: {
    width: "95%",
    // margin: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  btn: {
    // borderRadius: 20,
    // padding: 10,
    elevation: 2,
    margin: 8,
    borderRadius: 99,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#031D29",
  },
  emoji: {
    width: 48,
    height: 48,
  }
});

export default StartupMood;