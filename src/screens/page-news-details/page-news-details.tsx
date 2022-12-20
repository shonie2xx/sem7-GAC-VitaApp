import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const PageNewsDetails = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView style={styles.screen}>
      <Image
        source={require("../../../assets/header.png")}
        style={styles.header}
      ></Image>
      <View style={styles.wrapper}>
        <View style={styles.wrapperTop}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>
        <Image
          source={require("../../../assets/header.png")}
          style={styles.contentimage}
        ></Image>
      </View>
    </ScrollView>
  );
};

export default PageNewsDetails;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 200,
  },
  wrapper: {
    margin: 16,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    margin: 0,
    padding: 0,
    fontSize: 20,
    color: "#031D29",
  },
  description: {
    fontFamily: "Poppins_500Medium",
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: "#052D40",
    paddingVertical: 4,
  },
  date: {
    fontFamily: "Poppins_700Bold",
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: "#031D29",
  },
  screen: {
    backgroundColor: "white",
    height: "100%",
  },
  contentimage: {
    width: "100%",
    height: 150,
    paddingVertical: 4,
  },
  wrapperTop: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 4,
  },
});
