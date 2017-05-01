import { combineReducers } from 'redux';
import positionSelected from './position-selected-reducer';
import players from './players-reducer';
import { formattSelectedPlayers } from '../helpers';

const rootReducer = combineReducers({
    positionSelected,
    players
});

const getPlayersPositions = state => Object.keys(state.players);

const getPositionSelected = state => state.positionSelected;

const getPlayers = (state, position) => state.players[position];

const getSelectedPlayers = state => formattSelectedPlayers(state.players);

export default rootReducer;

export {
    getPositionSelected,
    getPlayers,
    getPlayersPositions,
    getSelectedPlayers
};
