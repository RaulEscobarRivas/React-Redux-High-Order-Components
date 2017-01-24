import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import createLogger from 'redux-logger';

import App from './components/app';
import Resources from './components/resources';
import reducers from './reducers';
import requireAuth from './components/require-auth';

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(logger)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="resources" component={requireAuth(Resources)} />
            </Route>
        </Router>
    </Provider>
    , document.querySelector('.container'));
