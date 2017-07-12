import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';
import Navbar from './components/navbar';
import UsersNew from './components/users_new';
import UsersIndex from './components/users_index';
import UsersShow from './components/users_show';
import Login from './components/login';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/users/new" component={ UsersNew } />
            <Route path="/users/:username" component={ UsersShow } />
            <Route path="/users" component={ UsersIndex } />
            <Route path="/" component={ Login } />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container-fluid'));
