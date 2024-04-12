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
    alignItems: 'center',
    height: 60,

    shadowColor: '#8da6b5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
