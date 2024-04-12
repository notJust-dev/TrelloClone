import { View, StyleSheet, SafeAreaView } from 'react-native';
import TaskList from './TaskList';
import { LinearGradient } from 'expo-linear-gradient';
import TaskDragArea from './TaskDragArea';
import { BSON } from 'realm';
import { useRealm } from '@realm/react';
import { Task } from '../models/Task';
import { ItemHeight } from './TaskListItem';

export default function TaskBoard() {
  const realm = useRealm();

  const updateItemPosition = (itemId: BSON.ObjectID, y: number) => {
    const newPosition = Math.max(1, Math.ceil((y - 73) / ItemHeight));

    const allTasks = realm.objects(Task).sorted('position');
    const allTasksArr = Array.from(allTasks);

    const fromIndex = allTasks.findIndex(
      (i) => i._id.toString() === itemId.toString()
    );

    const element = allTasksArr.splice(fromIndex, 1)[0];
    allTasksArr.splice(newPosition - 1, 0, element);

    realm.write(() => {
      allTasksArr.forEach((task, index) => {
        task.position = index + 1;
      });
    });
  };

  return (
    <TaskDragArea updateItemPosition={updateItemPosition}>
      <View style={{ padding: 10, flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#8711c1', '#2472fc']}
          style={StyleSheet.absoluteFill}
        />

        <TaskList />
      </View>
    </TaskDragArea>
  );
}
