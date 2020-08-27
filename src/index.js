import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from '../firebase/firebase';
import LoadingPage from './components/shared/LoadingPage';
import { receiveLogin, receiveLogout, receiveSignup } from './actions/auth';
import { startSetUserDocument, addUserDocument } from './actions/user';
import { startSetUserGroups } from './actions/groups';
import 'react-dates/lib/css/_datepicker.css';

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

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

firebase.auth().onAuthStateChanged( async (user) => {
    try {
        if (user) { // User is signed in.
            const uid = user.uid;
            console.log('Currently authenticated uid: ', uid);
            const isNewUser = history.location.pathname.includes('/signup');
            // Check if user just signed up 
            if (isNewUser) {
                console.log('signup');
                // Let redux store know user was able to successfully signup 
                store.dispatch(receiveSignup(user));
                // Initialize user document
                const doc = {
                    email: user.email,
                    display_name: user.displayName,
                    photo_url: user.photoURL || "../public/images/anonymous.png",
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
                    time_zone: null
                };
                // Add user document to users collection in firestore
                await addUserDocument(doc);
            } 
            console.log('log in');
            // Let redux store know user was able to successfully login
            store.dispatch(receiveLogin(user)); 
            // Fetch user document from firestore and set to redux store
            await store.dispatch(startSetUserDocument());
            // Fetch user document groups subcollection from firestore and set to redux store
            store.dispatch(startSetUserGroups());
            console.log("render app")
            // Render app with newly fetched data
            renderApp();
        } else { // User is not signed in
            console.log('log out');
            // Let redux store know user was able to successfully logout
            store.dispatch(receiveLogout());
            renderApp();
        }
    } catch (e) {
        console.log(e);
    }
});