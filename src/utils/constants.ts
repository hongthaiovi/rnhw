import {Platform, Dimensions, StatusBar} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');
export const screenHeight = Dimensions.get('screen').height;

export const IS_IOS = Platform.OS === 'ios';

export const WIDTH = width < height ? width : height; //for landscape devices
export const HEIGHT = width > height ? width : height; //for landscape devices

export const STATUS_BAR_HEIGHT = IS_IOS
  ? getStatusBarHeight(true)
  : StatusBar.currentHeight!;

export const HEADER_HEIGHT = HEIGHT / 4;

export const SAFE_AREA = getStatusBarHeight(true);

export const SAFE_FOOTER = isIphoneX() ? getStatusBarHeight(true) : 0;

export const statusBarTranslucent =
  IS_IOS || (Platform.OS === 'android' && Platform.Version >= 19);

export const APP_LINK_PREFIX = 'rnhw://';
export const BASE_URL = 'https://countries.trevorblades.com';
