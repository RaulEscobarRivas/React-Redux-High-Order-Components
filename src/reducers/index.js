import { combineReducers } from 'redux';
import positionSelected from './position-selected-reducer';
import playerSelection from './player-selection-reducer';
import ARQUEROS from '../model/arqueros';

const rootReducer = combineReducers({
    positionSelected,
    playerSelection
});

const getPositionSelected = state => (
    state.positionSelected
);

const getPlayers = (state, position) => {
    if (position === 'ARQUERO') {
        return ARQUEROS;
    }

    if (!state.playerSelection[position]) {
        return {
            player1: { name: 'JUGADOR 1', selected: false },
            player2: { name: 'JUGADOR 2', selected: false },
            player3: { name: 'JUGADOR 3', selected: false },
            player4: { name: 'JUGADOR 4', selected: false }
        };
    }

    return state.playerSelection[position].players;
};

export default rootReducer;

export { getPositionSelected, getPlayers };
