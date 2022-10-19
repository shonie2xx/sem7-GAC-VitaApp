import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HStack, Banner, Button } from "@react-native-material/core";

const Moodbooster = () => {
  return (
    <View>
      <Banner
        text="This is a moodbooster description"
        buttons={
          <HStack spacing={2}>
          </HStack>
        }
      />
    </View>
  );
};

export default Moodbooster;
