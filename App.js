import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Moodbooster  from './src/components/moodbooster/moodbooster';
// import Moodbooster from "./src/components/moodbooster/moodbooster"

export default function App() {
  return (
    <View>
      <Moodbooster />
    </View>
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
