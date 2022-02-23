// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import ListScreen from './screens/ListScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ListScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height:600
    // backgroundColor: '#DEFFE2'
  },
});
