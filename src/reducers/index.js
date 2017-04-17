import { combineReducers } from 'redux';
import positionSelected from './position-selected-reducer';
import playerSelection from './player-selection-reducer';

const rootReducer = combineReducers({
    positionSelected,
    playerSelection
});

const getPositionSelected = state => (
    state.positionSelected
);

export default rootReducer;

export { getPositionSelected };
