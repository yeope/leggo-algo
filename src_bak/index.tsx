import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './store';

import App from './App';
import PlayGround from './PlayGround.js';
import NotFound from './NotFound';

import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';

const store = configureStore();

const routing = (
  <Router>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/play" component={PlayGround} />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
