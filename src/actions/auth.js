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
import { startAddUserDocument } from './user';

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
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = res.user;
        dispatch(receiveLogin(user));
        // await verifyAuthStateChange();
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
        dispatch(receiveSignup(user));
        const userDoc = {
            about: '',
            avaliability: {},
            // creation_time: '',
            display_name: '',
            email: '',
            interests: [],
            is_anonymous: false,
            is_email_verfied: false,
            // last_sign_in_time: '',
            learn_skill: {},
            onboarded: 1,
            phone_number: null,
            photo_url: '',
            provider_id: "Firebase",
            teach_skill: {},
            time_zone: null,
            title: ''
        };
        await startAddUserDocument(userDoc);
        // await verifyAuthStateChange();
    } catch (e) {
        dispatch(signupError(e));
    }
}

export const startLogout = () => async (dispatch) => {
    console.log('startLogout is called');
    dispatch(requestLogout());
    try {
        await firebase.auth().signOut();
        dispatch(receiveLogout());
        // await verifyAuthStateChange();
    } catch (e) {
        dispatch(logoutError(e))
    }
};

// export const verifyAuthStateChange = () => async (dispatch) => {
//     console.log("verifyAuthStateChange is called");
//     try {
//         const user = firebase.auth().onAuthStateChanged();
//         if (user) { // User is signed in.
//             console.log('log in');
//             const uid = user.uid;
//             dispatch(receiveLogin(user)) // Lets redux know user is now authenticated and stores uid of currently authenticated user
//             dispatch(startFetchUserDocument(uid)) // Fetch user document from firestore using uid and set to store
//             await renderApp();
//             if (history.location.pathname === '/' || history.location.pathname === '/signup') { 
//                 history.push('/profile'); // Redirect to profile page
//             }
//         } else {
//             console.log('log out');
//             dispatch(receiveLogout());
//             renderApp();
//             history.push('/'); // Redirect to login page
//         }
//     } catch (e) {
//         dispatch(loginError(e));
//     }
// }

export const startSendPasswordResetEmail = (email) => async (dispatch) => {
    console.log('startSendPasswordResetEmail is called');
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        dispatch(sendPasswordResetEmail());
    } catch (e) {
        dispatch(loginError(e));
    }
};

