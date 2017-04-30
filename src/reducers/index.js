import { combineReducers } from 'redux';
import positionSelected from './position-selected-reducer';
import players from './players-reducer';

const rootReducer = combineReducers({
    positionSelected,
    players
});

const getPositionSelected = state => state.positionSelected;

const getPlayers = (state, position) =>  state.players[position];


export default rootReducer;

export { getPositionSelected, getPlayers };
