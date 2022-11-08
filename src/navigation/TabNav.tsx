import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageHome from '../screens/page-home/page-home';
import PageFeed from '../screens/page-feed/page-feed';
import PageFriends from '../screens/page-friends/page-friends';

export const TabNav = () => {
    
    const Tab = createBottomTabNavigator();
  
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'ios-wifi' : 'ios-wifi-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }
  
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0A5172',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Feed" component={PageFeed} options={{ headerShown: true }}/>
        <Tab.Screen name="Home" component={PageHome} options={{ headerShown: true }}/>
        <Tab.Screen name="Friends" component={PageFriends} options={{ headerShown: true }}/>
      </Tab.Navigator>
    )
  }