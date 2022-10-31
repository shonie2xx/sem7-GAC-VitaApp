import { Surface } from "react-native-paper";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { HStack, Banner, Button } from "@react-native-material/core";
import { Avatar, Card, IconButton, Button, Title, Paragraph } from "react-native-paper";

const Moodbooster = () => {
  return (
      <Surface style={styles.surface} elevation={1}>
        <Card.Title
          title=""
          subtitle="Ga morgen eerder opstaan om water te drinken"
          // left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => (
            <View style={styles.buttons}>
              <IconButton {...props} icon="account-plus" onPress={() => {}} />
              <Button mode="outlined" onPress={() => console.log("Pressed")}>
                Done
              </Button>
            </View>
          )}
        />
      </Surface>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  surface: {
    paddingRight: 10,
    margin: 10,
  },
});

export default Moodbooster;
