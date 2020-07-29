// Provider - allows us to provide the store to all of the components that make up my app

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from '../firebase/firebase';

const store = configureStore();

let hasRendered = false;
const renderApp = () => {
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
        console.log('log in');
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/profile');
        }
    } else { // No user is signed in.
      console.log('log out');
      renderApp();
      history.push('/');
    }
});