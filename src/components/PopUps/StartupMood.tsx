import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import {  Button } from "react-native-paper";
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
            <Text style={styles.modalText}>How we feeling today?</Text>
            <View style={{ flexDirection: "row" }}>
              <View >
                <Button mode="outlined" onPress={() => updateMoodPopUp(1)}>
                  Bad
                </Button>
              </View>
              <View >
                <Button mode="outlined" onPress={() => updateMoodPopUp(5)}>
                  Neutral
                </Button>
              </View>
              <Button mode="outlined" onPress={() => updateMoodPopUp(10)}>
                Awesome!
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default StartupMood;