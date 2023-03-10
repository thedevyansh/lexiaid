import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

import {
  PUBLIC_PAGE,
  LOGGED_IN_ONLY,
  NON_LOGGED_ONLY,
} from './components/hoc/options';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorNotFound from './pages/ErrorNotFound';

import Layout from './components/Layout';
import withAuthorization from './components/hoc/withAuthorization';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route
              path='/'
              exact
              component={withAuthorization(Home, PUBLIC_PAGE)}
            />
            <Route
              path='/register'
              exact
              component={withAuthorization(Register, NON_LOGGED_ONLY)}
            />
            <Route
              path='/login'
              exact
              component={withAuthorization(Login, NON_LOGGED_ONLY)}
            />
            <Route
              path='/'
              component={withAuthorization(ErrorNotFound, PUBLIC_PAGE)}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
