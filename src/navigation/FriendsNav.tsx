import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import PageFriends from '../screens/page-friends/page-friends';
import PageRequests from '../screens/page-friends/page-requests';
import {
    useFonts,
    Poppins_600SemiBold,
    Poppins_400Regular,
  } from "@expo-google-fonts/poppins";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const FriendsNav = () => {

    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
      });

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#031D29",
                tabBarInactiveTintColor: "#031D29",
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontFamily: "Poppins_600SemiBold",
                    textTransform: 'none'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#FA9901',
                    height: 3,
                },
            })}>
            <Tab.Screen name="Friends" component={PageFriends} />
            <Tab.Screen name="Requests" component={PageRequests} />
        </Tab.Navigator>
    );
};

export default FriendsNav;
