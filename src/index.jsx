import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import App from './components/App';
import './styles/index.scss';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#78909c',
      contrastText: '#f2f3f4',
    },
    secondary: {
      main: '#0072c8',
      contrastText: '#f2f3f4',
    },
  },
});

const render = (Component) => {
  console.log('theme', theme);
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>
    </MuiThemeProvider>,
    document.getElementById('root'),
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => { render(App); });
}
