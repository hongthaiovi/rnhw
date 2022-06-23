import { Platform, Appearance} from 'react-native';
import { Options } from 'react-native-navigation';
import { icDark, icLight } from '~/assets/images';
import { lightTheme } from '~/theme/themes';

export const getScreenStyle: () => Options = () => (lightTheme.screenTheme)
