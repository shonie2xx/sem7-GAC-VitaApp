import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './src/components/footer/footer';
import PageFriends from './src/screens/page-friends/page-friends';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PageHome from './src/screens/page-home/page-home';
import PageFeed from './src/screens/page-feed/page-feed';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function App() {
  const Tab = createBottomTabNavigator();
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Feed') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Friends') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Feed" component={PageFeed} />
        <Tab.Screen name="Home" component = {PageHome} />
        <Tab.Screen name="Friends" component = {PageFriends} />
      </Tab.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
