const { Navigation } = require("react-native-navigation");
const { registerScreens } = require("~/navigation/registerScreens");
const { SCREENS, STACK_IDS } = require("~/navigation/screens");

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.HOME,
            }
          },
        ],
        id: STACK_IDS.MAIN,
      }
    },
  });
});