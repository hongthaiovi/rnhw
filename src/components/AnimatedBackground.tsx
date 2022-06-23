import React, {memo, useContext, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTheme, ThemeContext} from '~/theme/useTheme';
import {darkTheme, lightTheme} from '~/theme/themes';
import {HEIGHT} from '~/utils/constants';

const AnimatedBackground = ({}: AnimatedBackgroundProps) => {
  const {isDark} = useContext(ThemeContext);
  //1 = dark; 0=light
  const theme = useRef(new Animated.Value(isDark ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(theme, {
      toValue: isDark ? 0 : 1,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return (
    <>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: lightTheme.backgroundColor,
          },
        ]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: darkTheme.backgroundColor,
              transform: [
                {
                  translateY: theme.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, HEIGHT],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </>
  );
};

type AnimatedBackgroundProps = {};

export default memo(AnimatedBackground);
