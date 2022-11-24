import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { useMoodPoints, useMoodPointsUpdate } from "./MoodPointsContext";
import { useFonts, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

const StartupMood = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const mood = useMoodPoints()
  const updateMood = useMoodPointsUpdate()

  function updateMoodPopUp(points) {
    setModalVisible(!modalVisible);
    updateMood(points)
    console.log(points)
  };

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold
  });
  
  if (!fontsLoaded) {
    return null;
  }

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
  },
  modalView: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  btn: {
    margin: 8,
    borderRadius: 99,
  },
  buttonOpen: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
    color: "#031D29",
    fontFamily: 'Poppins_700Bold'
  },
  emoji: {
    width: 40,
    height: 40,
  }
});

export default StartupMood;