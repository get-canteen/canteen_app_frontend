import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    SEND_PASSWORD_RESET_EMAIL
} from '../actions/types';

const authReducersDefaultState = {
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    signupError: null,
    loginError: null,
    logoutError: null,
    isAuthenticated: false,
    newUserIsCreated: false,
    sendPasswordReset: false
};

export default (state = authReducersDefaultState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isSigningUp: true,
                signupError: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                newUserIsCreated: true,
                user: action.user
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                isSigningUp: false,
                isAuthenticated: false,
                newUserIsCreated: false,
                signupError: action.error
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user,
                sendPasswordReset: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: action.error,
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                isAuthenticated: true,
                logoutError: null
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                newUserIsCreated: false,
                user: null
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                isLoggingOut: false,
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