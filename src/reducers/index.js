import { combineReducers } from 'redux';
import signedInStatus from './signed-in-reducer';

const rootReducer = combineReducers({
    signedInStatus
});

const getSignedInStatus = state => (
    state.signedInStatus
);

export default rootReducer;

export { getSignedInStatus };
