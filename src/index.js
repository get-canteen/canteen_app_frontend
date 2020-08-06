// Provider - allows us to provide the store to all of the components that make up my app

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
// import { firebase } from '../firebase/firebase';
// import { receiveLogin, receiveLogout } from './actions/auth';
// import { startFetchUserDocument } from './actions/user';

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