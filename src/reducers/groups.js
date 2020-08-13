import {
    SET_ALL_GROUPS
} from '../actions/types';


export default (state = [], action) => {
    switch (action.type) {
        case SET_ALL_GROUPS:
            return [
                ...action.groups
            ]
        default:
            return state;
    }
};
