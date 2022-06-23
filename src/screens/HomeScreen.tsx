import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, StatusBar, Linking} from 'react-native';
import {useGetCountriesLazyQuery} from '~/graphql/service';
// @ts-ignore
import styled from 'styled-components/native';
import AnimatedHeader from '~/components/AnimatedHeader';
import ContriesList from '~/components/ContriesList';
import {getScreenStyle} from '~/theme/getScreenStyle';
import {Navigation} from 'react-native-navigation';
import {SCREENS, STACK_IDS} from '~/navigation/screens';
import {useTheme} from '~/theme/useTheme';
import {handleDeeplink} from '~/navigation/handleDeeplink';
import AnimatedBackground from '~/components/AnimatedBackground';

export const HomeScreen = ({}: HomeScreenProps) => {
  const [getCountriesLazyQuery, {data, loading}] = useGetCountriesLazyQuery();
  const offset = useRef(new Animated.Value(0)).current;
  const {isDark} = useTheme();

  const onRefresh = useCallback(() => {
    getCountriesLazyQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const options = getScreenStyle(isDark ? 'dark' : 'light')
    Navigation.mergeOptions(
      STACK_IDS.MAIN,
      options
    );
  }, [isDark]);

  useEffect(() => {
    onRefresh();
    Navigation.showOverlay({
      component: {
        name: SCREENS.FAB,
        id: SCREENS.FAB,
      },
    });
    const eventListener = Linking.addEventListener('url', handleDeeplink);
    return eventListener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root>
      <AnimatedBackground />
      <StatusBar
        translucent
        animated
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <AnimatedHeader animatedValue={offset} />
      <ContriesList
        loading={loading}
        data={data?.countries}
        onRefresh={onRefresh}
        offset={offset}
      />
    </Root>
  );
};

//#region
type HomeScreenProps = {};

const Root = styled.View`
  flex: 1;
`;
HomeScreen.options = {
  topBar: {
    visible: false,
  },
  statusBar: {
    drawBehind: true,
    backgroundColor: 'transparent',
  },
}
//#endregion
