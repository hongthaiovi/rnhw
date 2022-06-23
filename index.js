const { Navigation } = require("react-native-navigation");
const { registerScreens } = require("~/navigation/registerScreens");
const { default: screens } = require("~/navigation/screens");

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
  
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: screens.HOME
          },
        ],
      }
    },
  });
});