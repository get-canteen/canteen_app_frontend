// Provider - allows us to provide the store to all of the components that make up my app

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from '../firebase/firebase';
import { receiveLogin, receiveLogout } from './actions/auth';
import { startFetchUserDocument } from './actions/user';

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
renderApp()

// need an firestore listener to listen on new users created to call createNewUserDocumentFunction  
firebase.auth().onAuthStateChanged((user) => {
    if (user) { // User is signed in.
        console.log('log in');
        const uid = user.uid;
        store.dispatch(receiveLogin(user)) // Lets redux know user is now authenticated and stores uid of currently authenticated user
        store.dispatch(startFetchUserDocument(uid)) // Fetch user document from firestore using uid and set to store
        .then(() => { 
            renderApp(); // Re-render app with newly fetched user data
            if (history.location.pathname === '/' || history.location.pathname === '/signup') { 
                history.push('/profile'); // Redirect to profile page
            }
        })
        .catch((e) => {
            console.log(e);
        })
    } else { // No user is signed in.
        console.log('log out');
        store.dispatch(receiveLogout()) // Lets redux know user is not authenticated 
        renderApp();
        history.push('/'); // Redirect to login page
    }
});