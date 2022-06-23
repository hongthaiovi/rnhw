import React, {useCallback, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {icBack} from '~/assets/images';
import {goBack} from '~/navigation/RootNavigation';
import {useTheme} from '~/theme/useTheme';
import {STATUS_BAR_HEIGHT} from '~/utils/constants';
// @ts-ignore
import styled from 'styled-components/native';

const NavigationBar = () => {
  const {isDark, colors} = useTheme();

  const onGoBack = useCallback(() => {
    goBack();
  }, []);

  const Root = useMemo(
    () =>
      styled.View`
        height: ${42 + STATUS_BAR_HEIGHT}px;
        background-color: white;
        width: 100%;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        background-color: ${colors.backgroundColor};
        border-bottom-width: 0.2px;
        border-color: ${colors.shadowColor};
      `,
    [colors],
  );

  return (
    <Root>
      <StatusBar
        translucent
        animated
        backgroundColor={'transparent'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Button onPress={onGoBack}>
        <Image source={icBack} />
      </Button>
    </Root>
  );
};

const Button = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  tint-color: #0078fa;
`;

export default NavigationBar;
