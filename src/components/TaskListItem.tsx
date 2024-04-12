import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Task } from '../models/Task';
import { useRealm } from '@realm/react';
import { useDraggingContext } from './TaskDragArea';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export const ItemHeight = 60;

export default function TaskListItem({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  const realm = useRealm();

  const { setDraggingTask, dragY, draggingTaskId } = useDraggingContext();

  const marginTop = useSharedValue(0);

  useAnimatedReaction(
    () => dragY?.value,
    (newDragY) => {
      if (!newDragY) {
        marginTop.value = 0;
      }
      const itemY = index * ItemHeight + 73;

      // if it's above the first item
      if (index === 0 && newDragY < itemY + ItemHeight) {
        marginTop.value = withTiming(ItemHeight);
      }

      // if it's on top of the current item
      // TODO: keep track of the currently dragging item, and offset the comparison, becuase it is deleted form the lists
      marginTop.value = withTiming(
        newDragY >= itemY && newDragY < itemY + ItemHeight ? ItemHeight : 0
      );
    }
  );

  useEffect(() => {
    const itemY = index * ItemHeight + 73;
    if (draggingTaskId) {
      marginTop.value =
        dragY.value >= itemY && dragY.value < itemY + ItemHeight
          ? ItemHeight
          : 0;
    } else {
      marginTop.value = 0;
    }
  }, [draggingTaskId]);

  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  if (draggingTaskId?.toString() === task._id.toString()) {
    return <Animated.View style={{ marginTop }} />;
  }

  return (
    <Animated.View style={[styles.root, { marginTop: marginTop }]}>
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
    </Animated.View>
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
