import { Stack } from 'expo-router';
import TaskBoard from '../components/TaskBoard';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Project Board' }} />
      <TaskBoard />
    </>
  );
}
