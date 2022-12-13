import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Title,
  Paragraph
} from "react-native-paper";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useEffect, useState, useContext } from "react";
import { getFriends } from "../../services/friendsService";
import { getAllUsers} from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";


const PageFriends = () => {
  const wave = require("../../../assets/wave.png");

  const {accessToken} = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([])
  const [nonFriends, setNonFriends] = useState([]);
  useEffect(() => {
    //fetchFriends()
    handleFriends()
    console.log(friends)
  }, [])

  const fetchFriends = async () => {
    const res = await getFriends(accessToken);
    console.log("friends", res)
    //const json = await res.json();
    setFriends(res);
  };
  
  const getUsers = async () => {
    const res = await getAllUsers(accessToken);
    // console.log("users", res)
    setUsers(res);
  }

  const handleFriends = async () => {
    await fetchFriends();
    await getUsers();
     for (var i = 0 ; i < users.length; i ++) {
      // if friends doesn't have a user, then add it to the nonFriends array
      if(!friends.includes(users[i])) {
        
        setNonFriends(nonFriends => [...nonFriends, users[i]]);
      }
     }
     console.log("Non friends", nonFriends);
  }

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    // <ScrollView style={styles.screen}>
    //   <ImageBackground source={wave} style={styles.wave}>
    //     <View>
    //       <Text>Friends</Text>
    //       {friends.map((item, index) => {
    //         <Card style={styles.surface} elevation={1} key={index}>
    //         <Card.Title title={item.name} />
    //         <Card.Actions>
    //            <Button mode="contained" onPress={() => console.log('Pressed')}>REMOVE</Button> 
    //         </Card.Actions>
    //       </Card>
    //       })}
    //       </View>
    //     </ImageBackground>
    //   <View>
    //     <Text>All other users</Text>
    //     {nonFriends.map((item, index) => (
          // <Card style={styles.surface} elevation={1} key={index}>
          //   <Card.Title title={item.name} />
          //   <Card.Actions>
          //      <Button mode="contained" onPress={() => console.log('Pressed')}>REMOVE</Button> 
          //   </Card.Actions>
          // </Card>
    //     ))}
    //   </View>
      
    //   </ScrollView>
    <ScrollView style={styles.screen}>
      <ImageBackground source={wave} style={styles.wave}>
      <View>
        
          <Text>Friends</Text>
        {friends.map( (item, index) => (
          <Card style={styles.surface} elevation={1} key={index}>
          <Card.Title title={item.name} />
          <Card.Actions>
             <Button mode="contained" onPress={() => console.log('Pressed')}>REMOVE</Button> 
          </Card.Actions>
        </Card>
        ))}
        
      </View>
      <View>
        <Text>Other people</Text>
        {nonFriends.map((item, index) => (
          <Card style={styles.surface} elevation={1} key={index}>
          <Card.Title title={item.name} />
          <Card.Actions>
             <Button mode="contained" onPress={() => console.log('Pressed')}>ADD</Button> 
          </Card.Actions>
        </Card>
        ))}
      </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default PageFriends;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
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
  touchcard: {

  },
  wave: {
    height: undefined,
    width: "100%",
    resizeMode: "center"
  },
  title: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 20, 
    margin: 8, 
    color: '#031D29', 
    paddingLeft: 16
  }
});
