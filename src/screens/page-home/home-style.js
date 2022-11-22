import { StyleSheet } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';

// import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const styles = StyleSheet.create({

// styling here
screen: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "white",
    fontFamily: 'Poppins_400Regular'
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  moodcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  moodnmbr: {
    position: "absolute",
    fontSize: 35,
    fontWeight: "bold",
    color: "#FFFFFF",
    zIndex: 3,
    textAlign: "center",
  },
  moodbg: {
    zIndex: 2,
    position: "relative",
    width: 72,
    height: 64,
  },
  pic: {
    marginTop: 16,
    width: 200,
    height: 200,
  },
  wave: {
    resizeMode: "cover",
    height: "70%",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 25,
    width: 25,
    textAlign: "center",
    backgroundColor: "#F1F1F1",
    color: "white",
    padding: 16,
    margin: 16,
    borderRadius: 4,
  },
  heading2: {
    fontSize: 28,
    paddingTop: 16,
    paddingBottom: 16,
    fontWeight: "bold",
  },
  homeTop: {
    // flex: 1,
    // alignSelf: 'stretch',
    // flexDirection: "row",
    // width: 200,
    justifyContent: "center",
    alignItems: "center",
  },

});

export { styles }