import {
    SET_GROUPS
} from '../actions/types';


export default (state = [], action) => {
    switch (action.type) {
        case SET_GROUPS:
            return [
                ...action.groups
            ]
        default:
            return state;
    }
};
