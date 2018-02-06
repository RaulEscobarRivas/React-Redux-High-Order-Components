import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'

import App from './components/app';
import reducers from './reducers';
import {
    updatePlayerSelection,
    positionSelected
} from './actions';
import { 
	getAllUrlParams,
	mapUrlParametersToSelectedPlayers 
} from './helpers';

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
);

if (Object.entries(getAllUrlParams()).length === 11) {
	store.dispatch(updatePlayerSelection(mapUrlParametersToSelectedPlayers(store.getState().players, getAllUrlParams())));
	store.dispatch(positionSelected('11 IDEAL'));
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('.app-container')
);
