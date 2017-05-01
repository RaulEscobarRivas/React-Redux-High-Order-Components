import { combineReducers } from 'redux';
import positionSelected from './position-selected-reducer';
import players from './players-reducer';

const rootReducer = combineReducers({
    positionSelected,
    players
});

const getPlayersPositions = state => Object.keys(state.players);

const getPositionSelected = state => state.positionSelected;

const getPlayers = (state, position) => {
    switch(position) {
        case 'DEFENSA':
            for (let player in state.players[position].lateralIzquierdo) {
                if (!isSelected(state.players[position].lateralIzquierdo[player])) {
                    return state.players[position].lateralIzquierdo;
                }
            }
            for (let player in state.players[position].centralIzquierdo) {
                if (!isSelected(state.players[position].centralIzquierdo[player])) {
                    return state.players[position].centralIzquierdo;
                }
            }
            for (let player in state.players[position].centralDerecho) {
                if (!isSelected(state.players[position].centralDerecho[player])) {
                    return state.players[position].centralDerecho;
                }
            }
            for (let player in state.players[position].lateralDerecho) {
                if (!isSelected(state.players[position].lateralDerecho[player])) {
                    return state.players[position].lateralDerecho;
                }
            }
            break;
    }

    return state.players[position];
};

const isSelected = player => player.selected === true;

export default rootReducer;

export {
    getPositionSelected,
    getPlayers,
    getPlayersPositions
};
