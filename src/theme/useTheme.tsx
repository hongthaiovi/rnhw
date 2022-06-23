import React, { useContext } from 'react';
import { darkTheme, lightTheme } from './themes';

const initialState = {
  isDark: false,
  colors: lightTheme,
};

const themeContextWrapper = (component?: React.Component) =>({
  ...initialState,
  setTheme: (theme: 'light' | 'dark') => {
    initialState.isDark = theme == 'dark';
    initialState.colors = theme == 'dark' ? darkTheme : lightTheme;
    component?.setState({ context: themeContextWrapper(component) });
  },
});

type Context = ReturnType<typeof themeContextWrapper>;

export const ThemeContext = React.createContext<Context>(themeContextWrapper());

interface State {
  context: Context;
}

export class ThemeProvider extends React.Component {
  state: State = {
    context: themeContextWrapper(this),
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state.context}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export const useTheme = () => initialState// useContext(ThemeContext);
