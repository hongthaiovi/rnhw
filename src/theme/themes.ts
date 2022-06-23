import {Options} from 'react-native-navigation';
export interface ITheme {
  backgroundColor: string;
  textColor: string;
  shadowColor: string;
  screenTheme: Options;
}

export const lightTheme: ITheme = {
  backgroundColor: 'white',
  textColor: '#3d3d3d',
  shadowColor: '#3d3d3d',
  screenTheme: {
    topBar: {
      background: {
        color: 'white',
      },
      backButton: {
        color: '#2e55ff',
      },
      barStyle: 'default',
    },
    navigationBar: {
      backgroundColor: 'white',
    },
    layout: {
      backgroundColor: 'white',
    },
  },
};

export const darkTheme: ITheme = {
  backgroundColor: '#3d3d3d',
  textColor: '#fafafa',
  shadowColor: '#fff',
  screenTheme: {
    topBar: {
      background: {
        color: '#3d3d3d',
      },
      barStyle: 'black',
      backButton: {
        color: '#2e55ff',
      },
    },
    navigationBar: {
      backgroundColor: '#3d3d3d',
    },
    layout: {
      backgroundColor: '#3d3d3d',
    },
  },
};
