import PageLogin from "./src/screens/page-login/page-login"
//import {useIsAuthenticated} from "@azure/msal-react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageCharacter from './src/screens/page-create-character/page-create-character';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageHome from './src/screens/page-home/page-home';
import PageFeed from './src/screens/page-feed/page-feed';
import PageFriends from './src/screens/page-friends/page-friends';

function App (){
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
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Feed" component={PageFeed} options={{ headerShown: false }}/>
      <Tab.Screen name="Home" component={PageHome} options={{ headerShown: false }}/>
      <Tab.Screen name="Friends" component={PageFriends} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
}


function Register() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={PageLogin} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCharacter" component={PageCharacter} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Register;


