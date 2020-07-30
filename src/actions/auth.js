import { firebase } from '../../firebase/firebase';
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from './types';

export const requestSignup = () => ({
    type: SIGNUP_REQUEST
});

export const receiveSignup = (user) => ({
    type: SIGNUP_SUCCESS,
    user
});

export const signupError = (error) => ({
    type: SIGNUP_ERROR,
    error
}); 

export const requestLogin = () => ({
    type: LOGIN_REQUEST
});

export const receiveLogin = (user) => ({
    type: LOGIN_SUCCESS,
    user
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error
});

export const requestLogout = () => ({
    type: LOGOUT_REQUEST
});

export const receiveLogout = () => ({
    type: LOGOUT_SUCCESS
});

export const logoutError = (error) => ({
    type: LOGOUT_ERROR,
    error
}); 

export const startLoginWithEmailAndPassword = (email, password) => dispatch => {
    console.log('startLoginWithEmailAndPassword is called');
    dispatch(requestLogin());
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((e) => {
            dispatch(loginError(e));
        });
};

export const startSignup = (email, password) => dispatch => {
    console.log('startSignup is called');
    dispatch(requestSignup());
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            const user = result.user;
            dispatch(receiveSignup(user));
        })
        .catch((e) => {
            dispatch(signupError(e));
        })
}

export const startLogout = () => dispatch => {
    console.log('startLogout is called');
    dispatch(requestLogout());
    return firebase
        .auth()
        .signOut()
        .catch((e) => {
            dispatch(logoutError(e))
        });
};