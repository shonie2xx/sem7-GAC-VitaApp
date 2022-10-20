import PageLogin from "./src/screens/page-login/page-login"
import {useIsAuthenticated} from "@azure/msal-react"
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageCharacter from './src/screens/page-create-character/page-create-character';
import PageHome from './src/screens/page-home/page-home';


export default function App() {
  
// const ProtectedRoute = ({ children }) => {
//     if (!useIsAuthenticated()) {
//       // return <Navigate to="/login" />;
//       return <PageLogin />;
//     }
//     return children;
//   };
  
const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={PageLogin} options={{headerShown: false}} />
      <Stack.Screen name="CreateCharacter" component = {PageCharacter}></Stack.Screen>
      <Stack.Screen name="Home" component = {PageHome}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


