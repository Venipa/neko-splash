import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { Route, Link, HashRouter as Router, Switch } from 'react-router-dom';
import NekoPage from './components/neko-page/neko-page';

const theme = createMuiTheme({
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
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
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
