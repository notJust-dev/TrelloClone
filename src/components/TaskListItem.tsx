import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Task } from '../models/Task';
import { useRealm } from '@realm/react';
import { useDraggingContext } from './TaskDragArea';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

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

  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (!dragY) {
      return {
        marginTop: 0,
      };
    }
    const itemY = index * ItemHeight + 73;

    // if it's above the first item
    if (index === 0 && dragY.value < itemY + ItemHeight) {
      return {
        marginTop: withTiming(ItemHeight),
      };
    }

    // if it's on top of the current item
    // TODO: keep track of the currently dragging item, and offset the comparison, becuase it is deleted form the lists
    return {
      marginTop: withTiming(
        dragY.value >= itemY && dragY.value < itemY + ItemHeight
          ? ItemHeight
          : 0
      ),
    };
  });

  if (draggingTaskId?.toString() === task._id.toString()) {
    return <Animated.View style={animatedStyle} />;
  }

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
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
