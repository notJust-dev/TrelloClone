import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Task } from '../models/Task';
import { BSON } from 'realm';
import { useObject } from '@realm/react';

export default function DraggingTask({ id }: { id: BSON.ObjectID }) {
  const task = useObject(Task, id);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {task.position}: {task.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D2125',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
