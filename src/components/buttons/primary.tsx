import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, StyleSheet, Pressable } from "react-native";

const Primary = ({}) => {
  return (
    <Pressable
      style={styles.btnPrimary}
      onPress={() => console.log("clicked!")}
    >
      <Text style={styles.buttontext}>LOG IN</Text>
    </Pressable>
  );
};

export default Primary;

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: "#419FD9",
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  buttontext: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    margin: 8,
    color: "white",
  },
});
