import PageEvent from '../screens/page-event/page-event';
import PageNews from '../screens/page-news/page-news';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageEventDetails from '../screens/page-event-details/page-event-details';
import { buildCodeAsync } from 'expo-auth-session/build/PKCE';
import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const FeedNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#031D29",
            tabBarInactiveTintColor: "#031D29",
            tabBarLabelStyle: {
              fontSize: 18,
              fontWeight: useIsFocused ? 'bold' : '400',
              textTransform: 'capitalized'
            },
            tabBarIndicatorStyle: {
                backgroundColor: '#FA9901',
                height: 3,
              },
          })}>
            <Tab.Screen name="Event" component={EventStackScreen} />
            <Tab.Screen name="News" component={PageNews} />
        </Tab.Navigator>
    );
};

const EventStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Events" component={PageEvent} options={{ headerShown: false }}/>
            <Stack.Screen name="Event Details" component={PageEventDetails}  />
        </Stack.Navigator>
    )
}

export default FeedNav;