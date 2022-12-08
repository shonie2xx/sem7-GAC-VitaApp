import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph,
  Surface,
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';

const PageNews = ({ navigation }) => {

  const [news, setNews] = useState([])
  
  return (
    <View>
      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, margin: 10 }}>Recent News</Text>
      <View>
        {news.map((item, index) => (
          <Surface style={styles.surface} elevation={1} key={index} >
            <Card.Title
              title={item.text} titleStyle={{ fontFamily: 'Poppins_400Regular' }}
              // left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <View style={styles.buttons}>
                  {/* <IconButton
                    {...props}
                    icon="account-plus"
                    onPress={() => {}}
                  /> */}
                  <Button
                    mode="contained"
                    buttonColor="#419FD9"
                    labelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                    onPress={() => navigation.navigate('News Details')}
                  >
                    See More
                  </Button>
                </View>
              )}
            />
          </Surface>
        ))}
      </View>
    </View>
  );
};

export default PageNews;


const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

  },
  surface: {
    borderRadius: 5,
    paddingRight: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    fontFamily: 'Poppins_600SemiBold'
  },
});

