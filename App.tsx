import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import TaskListItem from './src/components/TaskListItem';
import TaskList from './src/components/TaskList';
import TaskBoard from './src/components/TaskBoard';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskBoard />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
