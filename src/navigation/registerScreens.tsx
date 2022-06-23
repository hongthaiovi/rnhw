
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { HomeScreen } from '~/screens/HomeScreen';
import { CountryScreen } from '~/screens/CountryScreen';
import { ContinentScreen } from '~/screens/ContinentScreen';
import { apolloClient } from '~/graphql/client';
import { ApolloProvider } from '@apollo/client';
import screens from '~/navigation/screens';
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
  Navigation.registerComponent(screens.HOME.name, () => WrappedComponent(HomeScreen), () => HomeScreen);
  Navigation.registerComponent(screens.COUNTRY.name, () => WrappedComponent(CountryScreen), () => CountryScreen);
  Navigation.registerComponent(screens.CONTINENT.name, () => WrappedComponent(ContinentScreen), () => ContinentScreen);
  Navigation.registerComponent(screens.FAB.name, () => WrappedComponent(ChangeThemeButton), () => ChangeThemeButton);
}
