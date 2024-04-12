import { View, StyleSheet, useWindowDimensions } from 'react-native';
import DraggingTask from './DraggingTask';
import { BSON } from 'realm';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type DraggingContext = {
  setDraggingTask: (id: BSON.ObjectID) => void;
};

const DraggingContext = createContext<DraggingContext>({
  setDraggingTask: () => {},
});

const TaskDragArea = ({ children }: PropsWithChildren) => {
  const [draggingTaskId, setDraggingTaskId] = useState<BSON.ObjectID>(null);

  const { width } = useWindowDimensions();

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      dragX.value = event.absoluteX;
      dragY.value = event.absoluteY;
    })
    .onFinalize(() => {
      runOnJS(setDraggingTaskId)(null);
    });

  const setDraggingTask = (id: BSON.ObjectID) => {
    setDraggingTaskId(id);
  };

  return (
    <DraggingContext.Provider value={{ setDraggingTask }}>
      {children}
      <GestureDetector gesture={pan}>
        {draggingTaskId ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: 'rgba(100,100,100, 0.8)',
            }}
          >
            <Animated.View
              style={{
                width: width - 40,
                position: 'absolute',
                top: dragY,
                left: dragX,
              }}
            >
              <DraggingTask id={draggingTaskId} />
            </Animated.View>
          </View>
        ) : (
          <View />
        )}
      </GestureDetector>
    </DraggingContext.Provider>
  );
};

export default TaskDragArea;

export const useDraggingContext = () => useContext(DraggingContext);
