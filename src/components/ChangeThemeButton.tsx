import React, {useCallback, useMemo} from 'react';
import {icDark, icLight} from '~/assets/images';
import {useTheme} from '~/theme/useTheme';

// @ts-ignore
import {Options} from 'react-native-navigation';
import styled from 'styled-components/native';
import {SAFE_FOOTER, WIDTH} from '~/utils/constants';
import {Animated} from 'react-native';
import {useRef} from 'react';
import {useEffect} from 'react';

const ChangeThemeButton = ({}: ChangeThemeButtonProps) => {
  const {isDark, setTheme, colors, isFabLeft} = useTheme();
  const onChangeTheme = useCallback(() => {
    isDark ? setTheme('light') : setTheme('dark');
  }, [setTheme, isDark]);

  const position = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(position, {
      toValue: isFabLeft ? 0 : 1,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFabLeft]);

  const Button = useMemo(
    () => styled.TouchableOpacity`
      width: 70px;
      height: 70px;
      border-radius: 35px;
      shadow-opacity: 0.2;
      shadow-radius: 7px;
      shadow-offset: 0 7px;
      background-color: ${colors.backgroundColor};
      shadow-color: ${colors.shadowColor};
      justify-content: center;
      align-items: center;
      elevation: 7;
    `,
    [colors],
  );

  const Image = useMemo(
    () => styled.Image`
      tint-color: ${colors.textColor};
    `,
    [colors],
  );

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: SAFE_FOOTER + 20,
        right: 20,
        transform: [
          {
            translateX: position.interpolate({
              inputRange: [0, 1],
              outputRange: [-(WIDTH - 110), 0],
            }),
          },
        ],
      }}>
      <Button onPress={onChangeTheme}>
        <Image source={isDark ? icDark : icLight} />
      </Button>
    </Animated.View>
  );
};

interface ChangeThemeButtonProps {}
ChangeThemeButton.options = {
  overlay: {
    interceptTouchOutside: false,
  },
  topBar: {
    visible: false,
  },
  layout: {
    backgroundColor: 'rgba(0,0,0,0)',
    componentBackgroundColor: 'transparent',
  },
} as Options;
export default ChangeThemeButton;
