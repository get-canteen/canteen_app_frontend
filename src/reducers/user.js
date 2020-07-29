import {
    SET_USER_PROFILE
} from '../actions/types';

export default (state = { userData: null }, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                userData: action.userData
            }
        default:
            return state;
    }
};
