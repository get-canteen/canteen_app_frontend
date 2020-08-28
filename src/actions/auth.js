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
    LOGOUT_ERROR,
    SEND_PASSWORD_RESET_EMAIL
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

export const sendPasswordResetEmail = () => ({
    type: SEND_PASSWORD_RESET_EMAIL
})

export const startLoginWithEmailAndPassword = (email, password) => (dispatch) => {
    console.log('startLoginWithEmailAndPassword is called');
    dispatch(requestLogin());
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((e) => {
            dispatch(loginError(e));
        })
};

export const startCreateUserWithEmailAndPassword = (email, password) => (dispatch) => {
    console.log('startCreateUserWithEmailAndPassword is called');
    dispatch(requestSignup());
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((e) => {
            dispatch(signupError(e));
        })
}

export const startLogout = () => (dispatch) => {
    console.log('startLogout is called');
    dispatch(requestLogout());
    firebase.auth().signOut()
        .catch ((e) => {
            dispatch(logoutError(e));
        })
};

export const startSendPasswordResetEmail = (email) => async (dispatch) => {
    console.log('startSendPasswordResetEmail is called');
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            dispatch(sendPasswordResetEmail());
        })
        .catch((e) => {
            dispatch(loginError(e));
        })
};
