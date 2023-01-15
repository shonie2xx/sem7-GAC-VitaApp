import PageEvent from '../screens/page-event/page-event';
import PageNews from '../screens/page-news/page-news';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageEventDetails from '../screens/page-event-details/page-event-details';
import { buildCodeAsync } from 'expo-auth-session/build/PKCE';
import { useIsFocused } from '@react-navigation/native';
import PageNewsDetails from '../screens/page-news-details/page-news-details';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Feed = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={FeedTab} />
            <Stack.Screen name="Event Details" component={PageEventDetails} options={{ headerShown: true }}/>
            <Stack.Screen name="News Details" component={PageNewsDetails} options={{ headerShown: true }}/>
        </Stack.Navigator>
    )
}

const FeedTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#031D29",
                tabBarInactiveTintColor: "#031D29",
                tabBarLabelStyle: {
                    fontSize: 18,
                    fontWeight: useIsFocused ? 'bold' : '400',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#FA9901',
                    height: 3,
                },
            })}>
            <Tab.Screen name="Event" component={PageEvent} />
            <Tab.Screen name="News" component={PageNews} />
        </Tab.Navigator>
    );
};

export default Feed;
