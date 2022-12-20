import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, StyleSheet, Pressable } from "react-native";

const Secondary = ({}) => {
  return (
    <Pressable
      style={styles.btnSecondary}
      onPress={() => console.log("clicked!")}
    >
      <Text style={styles.buttontext}>LOG OUT</Text>
    </Pressable>
  );
};

export default Secondary;

const styles = StyleSheet.create({
  btnSecondary: {
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
