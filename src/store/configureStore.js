// createStore - creates the redux store that holds complete state tree of app
// combineReducers - allows us to combine multiple reducers (each managing independent parts of the state) into a single reducer
// applyMiddleWare - allows us to extend Redux with additional functionality, i.e. support asynchronous actions 
// compose - used to apply multiple store enhancers
// redux-thunk - allows action creators to return function instead of action, and hence create asynchronous actions

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({ 
            auth: authReducer,
            user: userReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};
