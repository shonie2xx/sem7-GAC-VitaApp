import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, StyleSheet, Pressable } from "react-native";

const PrimaryBtn = ({ text, press }) => {
  return (
    <Pressable
      style={styles.PrimaryBtn}
      onPress={press}
    >
      <Text style={styles.buttontext}>{text}</Text>
    </Pressable>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({
  PrimaryBtn: {
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
