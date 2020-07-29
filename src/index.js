// Provider - allows us to provide the store to all of the components that make up my app

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from '../firebase/firebase';
import { receiveLogin } from './actions/auth';
import { startSetUserProfile } from './actions/user';

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

firebase.auth().onAuthStateChanged((user) => {
    if (user) { // User is signed in.
        console.log('user',user);
        console.log('log in');
        store.dispatch(receiveLogin(user))
        .then(() => {
            store.dispatch(startSetUserProfile(user))
        })
        .then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/profile');
            }
        })
        .catch((e) => {
            console.log(e);
        })
    } else { // No user is signed in.
    console.log('user when logged out',user);
      console.log('log out');
      renderApp();
      history.push('/');
    }
});