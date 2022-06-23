import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {HEADER_HEIGHT, STATUS_BAR_HEIGHT} from '~/utils/constants';
const STATUS_BAR_OFFSET = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const AnimatedHeader = ({animatedValue}: AnimatedHeaderProps) => {
  return (
    <Animated.View
      pointerEvents={'none'}
      style={[
        styles.animatedStyle,
        {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [-1, 0, STATUS_BAR_OFFSET],
                outputRange: [0, 0, -STATUS_BAR_OFFSET],
                extrapolate: 'clamp',
              }),
            },
            {
              scaleY: animatedValue.interpolate({
                inputRange: [-STATUS_BAR_OFFSET, 0, 1],
                outputRange: [2.5, 1, 1],
              }),
            },
            {
              scaleX: animatedValue.interpolate({
                inputRange: [
                  -STATUS_BAR_OFFSET,
                  0,
                  STATUS_BAR_OFFSET,
                  HEADER_HEIGHT,
                ],
                outputRange: [2.5, 1, 1, 2],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}
    />
  );
};

//TODO: animated view do not supported styled component
const styles = StyleSheet.create({
  animatedStyle: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#febfcb',
    borderBottomLeftRadius: 50,
  },
});

type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
};

export default AnimatedHeader;
