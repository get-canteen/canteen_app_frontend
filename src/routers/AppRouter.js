import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
import NotFoundPage from '../components/shared/NotFoundPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import HomePage from '../components/shared/HomePage';
import User from './User';
import GroupPage from '../components/groups/GroupPage';
import MessagesPage from '../components/messages/MessagesPage';
import NotificationsPage from '../components/notifications/NotificationsPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute exact path="/" component={LoginPage}/>
            <PublicRoute path="/signup" component={SignupPage}/>
            <PublicRoute path="/forgot" component={ForgotPasswordPage}/>
            <PrivateRoute path="/home" component={HomePage}/>
            <PrivateRoute path="/profile/:id" component={User}/> 
            <PrivateRoute path="/group/:id" component={GroupPage}/>
            <PrivateRoute path="/messages" component={MessagesPage}/>
            <PrivateRoute path="/notifications" component={NotificationsPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;