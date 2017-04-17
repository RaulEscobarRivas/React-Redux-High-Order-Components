import { POSITION_SELECTED } from '../actions/types';

export default function (position = null, action) {
    switch(action.type) {
        case POSITION_SELECTED:
            return action.position;
        default:
            return position;
    }
    return position;
};