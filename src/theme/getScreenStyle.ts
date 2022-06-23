import {Options} from 'react-native-navigation';
import {darkTheme, lightTheme} from '~/theme/themes';

export const getScreenStyle: (theme: 'light' | 'dark') => Options = theme => {
  return theme == 'dark' ? darkTheme.screenTheme : lightTheme.screenTheme;
};
