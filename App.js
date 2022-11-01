import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/screens/page-home/HomePage';
import HomePage2 from './src/screens/page-home/HomePage';
import UploadImage from './src/screens/page-home/UploadImage';

export default function App() {
  return (
    <View style={styles.container}>
    <HomePage></HomePage>
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
