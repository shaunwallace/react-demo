import React from 'react';
import thunk from 'redux-thunk';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppContainer } from './containers';
import AppStore from './stores/AppStore';
import './App.css';

let store = createStore(AppStore, applyMiddleware(thunk));

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  store = createStore(AppStore, composeEnhancers(applyMiddleware(thunk)));
}

export default () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={AppContainer} />
    </Router>
  </Provider>
);
