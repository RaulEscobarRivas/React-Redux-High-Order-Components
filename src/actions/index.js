import {
    POSITION_SELECTED,
    UPDATE_PLAYER_SELECTION
} from './types';

export function positionSelected(position) {
    return {
        type: POSITION_SELECTED,
        position
    }
};

export function updatePlayerSelection(playerSelectionState) {
    return {
        type: UPDATE_PLAYER_SELECTION,
        payload: playerSelectionState
    }
}
