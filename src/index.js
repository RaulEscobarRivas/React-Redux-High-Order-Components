import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'

import App from './components/app';
import reducers from './reducers';

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
    , document.querySelector('.app-container'));
