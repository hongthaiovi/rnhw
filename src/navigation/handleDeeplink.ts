import {Navigation} from 'react-native-navigation';
import {APP_LINK_PREFIX} from '~/utils/constants';
import {SCREENS, STACK_IDS} from './screens';

export const handleDeeplink = (event: {url: string}) => {
  const {url} = event;
  let screenId = '';
  if (url.includes(`${APP_LINK_PREFIX}country/`)) {
    screenId = SCREENS.COUNTRY;
  } else if (url.includes(`${APP_LINK_PREFIX}continent/`)) {
    screenId = SCREENS.CONTINENT;
  } else {
    return;
  }
  const code = url.split('/')[3];
  Navigation.push(STACK_IDS.MAIN, {
    component: {
      name: screenId,
      passProps: {
        code,
      },
    },
  });
};
