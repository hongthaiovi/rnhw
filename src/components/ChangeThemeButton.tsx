import React, { useCallback, useContext, useMemo } from 'react';
import { icDark, icLight } from '~/assets/images';
import { useTheme,ThemeContext } from '~/theme/useTheme';
// @ts-ignore
import { Options } from 'react-native-navigation';
import styled from 'styled-components/native';
import { SAFE_FOOTER, WIDTH } from '~/utils/constants';

const ChangeThemeButton = ({ }: ChangeThemeButtonProps) => {
  const { isDark, setTheme, colors } =  useContext(ThemeContext);// useTheme();
  const onChangeTheme = useCallback(() => {
    isDark ? setTheme('light') : setTheme('dark');
  }, [setTheme, isDark]);

  const Button = useMemo(
    () => styled.TouchableOpacity`
      width: 70px;
      height: 70px;
      border-radius: 35px;
      shadow-opacity: 0.2;
      shadow-radius: 7px;
      background-color: ${colors.backgroundColor};
      shadow-color: ${colors.shadowColor};
      justify-content: center;
      align-items: center;
      elevation: 7;
      position: absolute;
      bottom: ${SAFE_FOOTER + 20}px;
      right: 20px
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
    <Button onPress={onChangeTheme}>
      <Image source={isDark ? icDark : icLight} />
    </Button>
  );
};

const Root = styled.View`
  flex: 1;
`
interface ChangeThemeButtonProps { }
ChangeThemeButton.options = {
  overlay: {
    interceptTouchOutside: false
  },
  topBar: {
    visible: false,
  },
  layout: {
    backgroundColor: 'rgba(0,0,0,0)',
    componentBackgroundColor: 'transparent',
  }
} as Options;
export default ChangeThemeButton
