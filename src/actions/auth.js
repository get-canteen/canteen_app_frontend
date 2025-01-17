import { firebase, googleAuthProvider, facebookAuthProvider } from '../../firebase/firebase';
import {
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    SEND_PASSWORD_RESET_EMAIL
} from './types';

export const receiveSignup = (user) => ({
    type: SIGNUP_SUCCESS,
    user
});

export const signupError = (error) => ({
    type: SIGNUP_ERROR,
    error
}); 

export const receiveLogin = (user) => ({
    type: LOGIN_SUCCESS,
    user
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error
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
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((e) => {
            dispatch(loginError(e));
        })
};

export const startCreateUserWithEmailAndPassword = (email, password) => (dispatch) => {
    console.log('startCreateUserWithEmailAndPassword is called');
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((e) => {
            dispatch(signupError(e));
        })
}

export const startLogout = () => (dispatch) => {
    console.log('startLogout is called');
    firebase.auth().signOut()
        .catch ((e) => {
            dispatch(logoutError(e));
        })
};

export const startSendPasswordResetEmail = (email) => (dispatch) => {
    console.log('startSendPasswordResetEmail is called');
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            dispatch(sendPasswordResetEmail());
        })
        .catch((e) => {
            dispatch(loginError(e));
        })
};

export const startLoginWithGoogle = () => (dispatch) => {
    console.log('startLoginWithGoogle called');
};


export const startLoginWithFacebook = () => (dispatch) => {
    console.log('startLoginWithFacebook called');
};