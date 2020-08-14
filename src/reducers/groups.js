import {
    SET_ALL_GROUPS
} from '../actions/types';

export default (state = { allGroups: {} }, action) => {
    switch (action.type) {
        case SET_ALL_GROUPS:
            return {
                ...state,
                allGroups: action.allGroups
            }
        default:
            return state;
    }
};
