
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { HomeScreen } from '~/screens/HomeScreen';
import { CountryScreen } from '~/screens/CountryScreen';
import { ContinentScreen } from '~/screens/ContinentScreen';
import { apolloClient } from '~/graphql/client';
import { ApolloProvider } from '@apollo/client';
import {SCREENS} from '~/navigation/screens';
import { ThemeProvider } from '~/theme/useTheme';
import ChangeThemeButton from '~/components/ChangeThemeButton';

function WrappedComponent(Component: (props: any) => JSX.Element) {
  const EnhancedComponent = (props: any) => (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    </ApolloProvider>
  );
  // @ts-ignore
  EnhancedComponent.options = Component?.options
  return EnhancedComponent
}

export const registerScreens = () => {
  Navigation.registerComponent(SCREENS.HOME, () => WrappedComponent(HomeScreen), () => HomeScreen);
  Navigation.registerComponent(SCREENS.COUNTRY, () => WrappedComponent(CountryScreen), () => CountryScreen);
  Navigation.registerComponent(SCREENS.CONTINENT, () => WrappedComponent(ContinentScreen), () => ContinentScreen);
  Navigation.registerComponent(SCREENS.FAB, () => WrappedComponent(ChangeThemeButton), () => ChangeThemeButton);
}
