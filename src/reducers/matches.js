import {
    SET_MATCHES,
    SET_MESSAGES
} from '../actions/types';

const defaultReducerState = {
    matches: [],
    messages: {}
}

export default (state = defaultReducerState, action) => {
    switch (action.type) {
        case SET_MATCHES:
            return {
                ...state,
                matches: action.matches
            }
        case SET_MESSAGES: 
            return {
                ...state,
                messages: action.messages
            }
        default:
            return state;
    }
};
