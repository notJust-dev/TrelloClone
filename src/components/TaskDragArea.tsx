import { View, StyleSheet, useWindowDimensions } from 'react-native';
import DraggingTask from './DraggingTask';
import { BSON } from 'realm';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type DraggingContext = {
  draggingTaskId: BSON.ObjectID;
  setDraggingTask: (id: BSON.ObjectID, y: number) => void;
  dragY?: SharedValue<number>;
  dragOffsetY?: SharedValue<number>;
};

const DraggingContext = createContext<DraggingContext>({
  setDraggingTask: () => {},
  draggingTaskId: null,
});

const TaskDragArea = ({
  children,
  updateItemPosition,
}: PropsWithChildren<{
  updateItemPosition: (id: BSON.ObjectID, y: number) => void;
}>) => {
  const [draggingTaskId, setDraggingTaskId] = useState<BSON.ObjectID>(null);
  const { width } = useWindowDimensions();

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const dragOffsetY = useSharedValue(0);

  const drop = () => {
    updateItemPosition(draggingTaskId, dragY.value);
    setDraggingTaskId(null);
  };

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      if (draggingTaskId) {
        stateManager.activate();
      }
    })
    .onChange((event) => {
      dragX.value = dragX.value + event.changeX;
      dragY.value = dragY.value + event.changeY;
    })
    .onEnd(() => {
      console.log('Dropped');
      runOnJS(drop)();
    })
    .onFinalize(() => {
      runOnJS(setDraggingTaskId)(null);
    });

  const setDraggingTask = (id: BSON.ObjectID, y: number) => {
    setDraggingTaskId(id);

    dragY.value = y;
    dragX.value = 20;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: dragY.value - dragOffsetY.value,
      left: dragX.value,
    };
  });

  return (
    <DraggingContext.Provider
      value={{
        setDraggingTask,
        dragY: draggingTaskId ? dragY : undefined,
        draggingTaskId,
        dragOffsetY,
      }}
    >
      <GestureDetector gesture={pan}>
        <View
          style={{
            ...StyleSheet.absoluteFill,
          }}
        >
          {children}

          <Animated.View
            style={[
              animatedStyle,
              {
                width: width - 40,
                position: 'absolute',
                transform: [
                  {
                    rotateZ: '3deg',
                  },
                ],
              },
            ]}
          >
            {draggingTaskId && <DraggingTask id={draggingTaskId} />}
          </Animated.View>
        </View>
      </GestureDetector>
    </DraggingContext.Provider>
  );
};

export default TaskDragArea;

export const useDraggingContext = () => useContext(DraggingContext);
