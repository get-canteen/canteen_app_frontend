import {
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    SEND_PASSWORD_RESET_EMAIL
} from '../actions/types';

const authReducersDefaultState = {
    user: null,
    isAuthenticated: false,
    newUserIsCreated: false,
    sendPasswordReset: false,
    signupError: null,
    loginError: null,
    logoutError: null
};

export default (state = authReducersDefaultState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.user,
                newUserIsCreated: true
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                newUserIsCreated: false,
                signupError: action.error
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                sendPasswordReset: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                loginError: action.error,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                newUserIsCreated: false
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                isAuthenticated: true,
                logoutError: action.error
            }
        case SEND_PASSWORD_RESET_EMAIL:
            return {
                ...state,
                sendPasswordReset: true
            }
        default:
            return state;
    }
};