import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Task } from '../models/Task';
import { useRealm } from '@realm/react';
import { useDraggingContext } from './TaskDragArea';

export const ItemHeight = 60;

export default function TaskListItem({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  const realm = useRealm();

  const { setDraggingTask } = useDraggingContext();

  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  return (
    <View style={styles.root}>
      <Link href={`/${task._id}`} asChild>
        <Pressable
          style={styles.container}
          onLongPress={() => setDraggingTask(task._id, index * ItemHeight + 73)}
        >
          <Text style={styles.text}>
            {task.position}: {task.description}
          </Text>

          <AntDesign onPress={deleteTask} name="close" size={16} color="gray" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: ItemHeight,
    paddingVertical: 3,
  },
  container: {
    backgroundColor: '#1D2125',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
