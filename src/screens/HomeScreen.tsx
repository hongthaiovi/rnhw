import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StatusBar, Linking } from 'react-native';
import { useGetCountriesLazyQuery } from '~/graphql/service';
// @ts-ignore
import styled from 'styled-components/native';
import AnimatedHeader from '~/components/AnimatedHeader';
import ContriesList from '~/components/ContriesList';
import AnimatedBackground from '~/components/AnimatedBackground';
import { getScreenStyle } from '~/theme/getScreenStyle';
import { Navigation } from 'react-native-navigation';
import screens from '~/navigation/screens';
import { useTheme } from '~/theme/useTheme';
import { handleDeeplink } from '~/navigation/handleDeeplink';

export const SCREEN_ID = 'HomeScreen';
export const HomeScreen = ({ }: HomeScreenProps) => {
  const [getCountriesLazyQuery, { data, loading }] = useGetCountriesLazyQuery();
  const offset = useRef(new Animated.Value(0)).current;
  const theme = useTheme()

  const onRefresh = useCallback(() => {
    getCountriesLazyQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onRefresh();
    Navigation.showOverlay({
      component: screens.FAB
    })
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
  ...getScreenStyle(),
  topBar: {
    visible: false,
  },
  statusBar:{
    style: 'dark',
    drawBehind: true,
    backgroundColor: 'rgba(0,0,0,0)',
  }
}
//#endregion
