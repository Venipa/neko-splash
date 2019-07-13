import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import NekoPage from './components/neko-page/neko-page';
import { BehaviorSubject, Subject } from 'rxjs';
import { NekoSettings, DefaultNekoSettings } from './models/neko-settings';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

const localSettings = localStorage.getItem('settings');
export const settings = new BehaviorSubject<NekoSettings>(
  localSettings && JSON.parse(localSettings)
    ? Object.assign(DefaultNekoSettings, JSON.parse(localSettings))
    : DefaultNekoSettings
);
export const settings$ = settings.asObservable().pipe(
  distinctUntilChanged(),
  tap(s => {
    localStorage.setItem('settings', JSON.stringify(s));
  })
);

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      '100': '#111',
      '200': '#111',
      '300': '#111',
      '400': '#111',
      '500': '#111',
      '600': '#111',
      '700': '#111',
      '800': '#111',
      '900': '#111',
      contrastText: '#fff'
    },
    secondary: {
      main: '#7289DA'
    }
  }
});
export const light_theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      '100': '#fff',
      '200': '#fff',
      '300': '#fff',
      '400': '#fff',
      '500': '#fff',
      '600': '#fff',
      '700': '#fff',
      '800': '#fff',
      '900': '#fff',
      contrastText: '#111'
    },
    secondary: {
      main: '#7289DA'
    }
  }
});
export interface AppProps {
  settings: NekoSettings;
}

class App extends Component<any, AppProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      settings: settings.getValue()
    };
  }
  private unmount = new Subject<void>();
  componentWillUnmount() {
    this.unmount.next();
    this.unmount.complete();
  }
  componentDidMount() {
    settings
      .pipe(
        distinctUntilChanged((l, r) => l.darkMode === r.darkMode),
        takeUntil(this.unmount)
      )
      .subscribe(x => {
        this.setState({
          settings: x
        });
        if (x.darkMode) {
          document.querySelector('body')!.classList.add('dark');
        } else {
          document.querySelector('body')!.classList.remove('dark');
        }
      });
  }
  render() {
    return (
      <ThemeProvider theme={this.state.settings.darkMode ? theme : light_theme}>
        <Router ref="router">
          <Switch>
            <Route path="/" component={() => <NekoPage />} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
