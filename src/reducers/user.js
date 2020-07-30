import {
    SET_USER_DOCUMENT
} from '../actions/types';

export default (state = { userData: null }, action) => {
    switch (action.type) {
        case SET_USER_DOCUMENT:
            return {
                userData: action.userData
            }
        default:
            return state;
    }
};
