import { UPDATE_PLAYER_SELECTION } from '../actions/types';

export default function (playerSelection = {}, action) {
    switch(action.type) {
        case UPDATE_PLAYER_SELECTION:
            return Object.assign({}, playerSelection, { [action.payload.position] : action.payload })
        default:
            return playerSelection;
    }
    return playerSelection;
};