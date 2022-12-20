import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, StyleSheet, Pressable } from "react-native";

const SecondaryBtn = ({ text, press }) => {
  return (
    <Pressable
      style={styles.SecondaryBtn}
      onPress={press}
    >
      <Text style={styles.buttontext}>{text}</Text>
    </Pressable>
  );
};

export default SecondaryBtn;

const styles = StyleSheet.create({
  SecondaryBtn: {
    backgroundColor: "white",
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FA9901"
  },
  buttontext: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    margin: 8,
    color: "#FA9901",
  },
});
