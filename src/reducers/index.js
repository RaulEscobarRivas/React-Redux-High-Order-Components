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

const getPlayersSelected = (state, position) => {
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

export { getPositionSelected, getPlayersSelected };
