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
    firebase.auth().signInWithPopup(googleAuthProvider)
        .catch((error) => {
            dispatch(loginError(error));
            if (error.code === 'auth/popup-blocked') {
                console.log('signInWithRedirect called');
                firebase.auth().signInWithRedirect(provider)
                .catch((error) => {
                    dispatch(loginError(error));
                })
            } 
            if (error.code === 'auth/account-exists-with-different-credential') { // User's email already exists.
                console.log('fetchSignInMethodsForEmail called');
                firebase.auth().fetchSignInMethodsForEmail(error.email)
                .then((methods) => {
                    // if (methods[0] === "password") {
                    //     dispatch(loginError({ message: 'Please enter password'}));
                    //     firebase.auth().signInWithEmailAndPassword(error.email, password)
                    //         .then((user) => {
                    //             return user.linkWithCredential(error.credential);
                    //         })
                    //         .then(() => {
                    //             goToApp(); // Google account successfully linked to the existing Firebase user.
                    //         });
                    //         return;
                    // }   
                    // if (methods[0] === "facebook.com") {
                    //     firebase.auth().signInWithPopup(googleAuthProvider)
                    //     .then((result) => {
                    //         result.user.linkAndRetrieveDataWithCredential(error.credential)
                    //         .then((user) => {
                    //             console.log("user", user);
                    //             goToApp();
                    //         })
                    //         .catch((error) => {
                    //             dispatch(loginError(error));
                    //         });
                    //     });
                    // }; 
                })
                .catch((error) => {
                    dispatch(loginError(error));
                })
            } 
    });
};
