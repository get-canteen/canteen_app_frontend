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
import { renderApp } from '../index';
import { history } from '../routers/AppRouter';
import { startAddUserDocument, startFetchUserDocument } from './user';

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

export const startLoginWithEmailAndPassword = (email, password) => async (dispatch) => {
    console.log('startLoginWithEmailAndPassword is called');
    dispatch(requestLogin());
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch(verifyAuthStateChange());
    } catch (e) {
        dispatch(loginError(e));
    }
};

export const startCreateUserWithEmailAndPassword = (email, password) => async (dispatch) => {
    console.log('startCreateUserWithEmailAndPassword is called');
    dispatch(requestSignup());
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = res.user;
        console.log("user in startCreateUserWithEmailAndPassword", user);
        dispatch(receiveSignup(user));
        const userDoc = {
            email: user.email,
            display_name: user.displayName,
            photo_url: user.photoURL,
            is_anonymous: user.isAnonymous,
            is_email_verfied: user.emailVerified,
            phone_number: user.phoneNumber,
            provider_id: user.providerId,
            title: '',
            about: '',
            interests: [],
            avaliability: {},
            learn_skill: {},
            onboarded: 1,
            teach_skill: {},
            time_zone: null,
        };
        await startAddUserDocument(user.uid, userDoc);
        dispatch(verifyAuthStateChange());
    } catch (e) {
        dispatch(signupError(e));
    }
}

export const startLogout = () => async (dispatch) => {
    console.log('startLogout is called');
    dispatch(requestLogout());
    try {
        await firebase.auth().signOut();
        dispatch(verifyAuthStateChange());
    } catch (e) {
        dispatch(logoutError(e))
    }
};

export const verifyAuthStateChange = () => (dispatch) => {
    console.log("verifyAuthStateChange is called");
    try {
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user) { // User is signed in.
                console.log('log in');
                const uid = user.uid;
                dispatch(receiveLogin(user)) 
                await dispatch(startFetchUserDocument(uid))
                renderApp();
                if (history.location.pathname === '/' || history.location.pathname === '/signup') { 
                    history.push('/profile');
                }
            } else {
                console.log('log out');
                dispatch(receiveLogout());
                renderApp();
                history.push('/');
            }
        });
    } catch (e) {
        dispatch(loginError(e));
    }
}

export const startSendPasswordResetEmail = (email) => async (dispatch) => {
    console.log('startSendPasswordResetEmail is called');
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        dispatch(sendPasswordResetEmail());
    } catch (e) {
        dispatch(loginError(e));
    }
};

