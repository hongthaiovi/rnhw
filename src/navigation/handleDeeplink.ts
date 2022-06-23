import { Navigation } from 'react-native-navigation';
import { APP_LINK_PREFIX } from '~/utils/constants';
import screens from './screens';

export const handleDeeplink = (event: { url: string }) => {
    const { url } = event;
    let screenId = '';
    if (url.includes(`${APP_LINK_PREFIX}country/`)) {
        screenId = screens.COUNTRY.id;
    } else if (url.includes(`${APP_LINK_PREFIX}continent/`)) {
        screenId = screens.CONTINENT.id;
    } else {
        return
    }
    const code = url.split('/')[3];

    Navigation.push(screens.HOME.id, {
        component: {
            name: screenId,
            passProps: {
                code,
            }
        }
    }).catch(async (error) => {
        console.log(error);
        // fix android can
        await Navigation.popTo(screenId);
        Navigation.updateProps(screenId, {
            code,
        });
    })
}