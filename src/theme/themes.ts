
import { Options } from 'react-native-navigation';
export interface ITheme {
  backgroundColor: string;
  textColor: string;
  shadowColor: string;
  screenTheme: Options;
}

export const darkTheme: ITheme = {
  backgroundColor: '#3d3d3d',
  textColor: '#fafafa',
  shadowColor: '#f1f1f1',
  screenTheme:  {
    topBar: {
      // visible: false,
      background: {
        color: '#3d3d3d',
      },
      noBorder: false,
      borderColor: '#fff',
      borderHeight: 1,
    },
    statusBar: {
      style: 'light',
      drawBehind: true,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    navigationBar: {
      backgroundColor: 'rgba(0,0,0,0)'
    },
    layout: {
      backgroundColor: '#3d3d3d',
    },
  }
};

export const lightTheme: ITheme = {
  backgroundColor: 'white',
  textColor: '#3d3d3d',
  shadowColor: '#3d3d3d',
  screenTheme:  {
    topBar: {
      // visible: false,
      background: {
        color: 'white',
      },
      noBorder: false,
      borderColor: '#ccc',
      borderHeight: 1,
    },
    statusBar: {
      style: 'dark',
      drawBehind: true,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    navigationBar: {
      backgroundColor: 'rgba(0,0,0,0)'
    },
    layout: {
      backgroundColor: 'white',
    },
  }
};
