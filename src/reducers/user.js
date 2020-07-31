import {
    SET_USER_DOCUMENT
} from '../actions/types';

const defaultUserState = {
    display_name: '',
    title: '',
    about: '',
    photo_url: '',
    interests: [],
    learn_skill: {},
    teach_skill : {},
    avaliability: {}
}

export default (state = defaultUserState, action) => {
    switch (action.type) {
        case SET_USER_DOCUMENT:
            return {
                ...state,
                ...action.userData
            }
        default:
            return state;
    }
};
