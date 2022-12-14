import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, Image, Platform, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { useMoodPoints, useMoodPointsUpdate } from "./MoodPointsContext";
import { useFonts, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { TouchableHighlight} from 'react-native'
import Svg, { Circle } from 'react-native-svg';


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
              <Pressable
                  style={styles.btn}
                  onPress={() => updateMoodPopUp(1)}>
                    <Svg height="50%" width="50%" viewBox="0 0 100 100">
                      <Circle cx="50" cy="50" r="50" stroke="purple" strokeWidth=".5" fill="violet" />
                    </Svg>
                  <Image source={require("../../../assets/modal_frowney.png")} style={styles.emoji}/>
              </Pressable>
              <Pressable
                  style={styles.btn}
                  onPress={() => updateMoodPopUp(5)}>
                  <Image source={require("../../../assets/modal_neutral.png")} style={styles.emoji}/>
              </Pressable>
              <Pressable
                  style={styles.btn}
                  onPress={() => updateMoodPopUp(10)}>
                  <Image source={require("../../../assets/modal_happy.png")} style={styles.emoji}/>
              </Pressable>
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
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  btn: {
    margin: 16,
    justifyContent: "space-between",
    height: 48,
    width: 48,
    paddingBottom: 32
  },
  PressableOpen: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  PressableClose: {
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
    flex: 1,
    // flex: Platform.OS === 'ios' ? 1 : null,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 42,
    minHeight: 42,
    resizeMode: "stretch"
  }
});

export default StartupMood;