import React, {useContext} from 'react';
import {darkTheme, ITheme, lightTheme} from './themes';
// @ts-ignore
import shortid from 'shortid';

declare type ThemeProviderProps = {
  isDark: boolean;
  colors: ITheme;
  setTheme: Function;
};
let ThemeContextProviderInstances: any = {};

const setTheme = (theme: 'light' | 'dark') => {
  globalStateValue.isDark = theme === 'dark';
  globalStateValue.colors = theme === 'dark' ? darkTheme : lightTheme;
  for (let instanceId in ThemeContextProviderInstances) {
    ThemeContextProviderInstances[instanceId].forceUpdate();
  }
};

const initialState: ThemeProviderProps = {
  isDark: false,
  colors: lightTheme,
  setTheme: setTheme,
};

const globalStateValue: ThemeProviderProps = initialState;

const themeContextWrapper = (component?: React.Component) =>
  new Proxy(initialState, {
    set(obj, prop, value) {
      // @ts-ignore
      obj[prop] = value;
      component?.setState({context: themeContextWrapper(component)});
      return true;
    },
  });

export const ThemeContext = React.createContext(themeContextWrapper());

export class ThemeProvider extends React.Component {
  private _instanceId: string = shortid();

  constructor(props: ThemeProviderProps) {
    super(props);
    this.state = {
      context: themeContextWrapper(this),
    };
  }
  shouldComponentUpdate(): boolean {
    return true;
  }

  componentDidMount(): void {
    ThemeContextProviderInstances[this._instanceId] = this;
  }

  componentWillUnmount(): void {
    delete ThemeContextProviderInstances[this._instanceId];
  }

  render() {
    const value = {
      setTheme: setTheme,
      // @ts-ignore
      isDark: this.state?.context?.isDark,
      // @ts-ignore
      colors: this.state?.context?.colors,
    };
    return (
      <ThemeContext.Provider value={value}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export const useTheme = () => useContext(ThemeContext);
