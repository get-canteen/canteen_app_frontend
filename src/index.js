// Provider - allows us to provide the store to all of the components that make up my app

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from '../firebase/firebase';
import { receiveLogin, receiveLogout, receiveSignup } from './actions/auth';
import { startFetchUserDocument, startAddUserDocument } from './actions/user';

const store = configureStore(); 

let hasRendered = false;
export const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(
            <Provider store={store}> 
                <AppRouter/> 
            </Provider>, document.getElementById('app')
        );
        hasRendered = true;
    }
}
renderApp();

firebase.auth().onAuthStateChanged( async (user) => {
    try {
        if (user) { // User is signed in.
            const uid = user.uid;
            const isNewUser = history.location.pathname.includes('/signup');
            if (isNewUser) {
                console.log('signup');
                store.dispatch(receiveSignup(user));
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
                    // created_on: null,
                    // last_updated: null
                };
                await startAddUserDocument(user.uid, userDoc);
            } 
            console.log('log in');
            store.dispatch(receiveLogin(user)) 
            await store.dispatch(startFetchUserDocument(uid))
            renderApp();
            if (history.location.pathname === '/' || history.location.pathname === '/signup') { 
                history.push('/profile');
            }
        } else {
            console.log('log out');
            store.dispatch(receiveLogout());
            renderApp();
            history.push('/');
        }
    } catch (e) {
        console.log(e);
    }
});