import {
    SET_USER_GROUPS
} from '../actions/types';

const defaultGroupState = { 
    userGroups: {} 
};

export default (state = defaultGroupState, action) => {
    switch (action.type) {
        case SET_USER_GROUPS:
            return {
                ...state,
                userGroups: action.groups
            }
        default:
            return state;
    }
};
