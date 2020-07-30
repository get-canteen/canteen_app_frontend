import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import ProfilePage from '../components/ProfilePage';
// import HomePage from '../components/HomePage';
// import SearchPage from '../components/SearchPage';
// import MessagesPage from '../components/MessagesPage';
// import NotificationsPage from '../components/NotificationsPage';
import NotFoundPage from '../components/NotFoundPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        {/* <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
        <Switch> 
            <PublicRoute exact path="/" component={LoginPage}/>
            <PublicRoute path="/signup" component={SignupPage}/>
            <PrivateRoute path="/profile" component={ProfilePage}/>
            {/* <Route path="/home" component={HomePage}/>
            <Route path="/search" component={SearchPage}/>
            <Route path="/messages" component={MessagesPage}/>
            <Route path="/notifications" component={NotificationsPage}/> */}
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;