import { UPDATE_PLAYER_SELECTION } from '../actions/types';
import playersModel from '../model/players';

export default function (playerSelection = playersModel, action) {
    switch(action.type) {
        case UPDATE_PLAYER_SELECTION:
            return Object.assign({}, playerSelection, { [action.position] : action.players })
        default:
            return playerSelection;
    }
    return playerSelection;
};