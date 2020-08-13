import {
    SET_USER_DOCUMENT,
    SET_USER_GROUPS
} from '../actions/types';

const defaultUserState = {
    display_name: '',
    title: '',
    about: '',
    photo_url: '',
    interests: [],
    learn_skill: {},
    teach_skill : {},
    avaliability: {},
    groups: {}
}

export default (state = defaultUserState, action) => {
    switch (action.type) {
        case SET_USER_DOCUMENT:
            return {
                ...state,
                ...action.userData
            }
        case SET_USER_GROUPS:
            return {
                ...state,
                groups: action.groups
            }
        default:
            return state;
    }
};
