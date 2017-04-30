import {
    POSITION_SELECTED,
    UPDATE_PLAYER_SELECTION
} from './types';

export function positionSelected(position) {
    return {
        type: POSITION_SELECTED,
        position
    };
};

export function updatePlayerSelection(players) {
    return (dispatch, getState) => {
        const { positionSelected } = getState();
        dispatch({
            type: UPDATE_PLAYER_SELECTION,
            position: positionSelected,
            players
        });
    };
}
