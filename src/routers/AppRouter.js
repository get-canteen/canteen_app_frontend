import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
import NotFoundPage from '../pages/shared/NotFoundPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import HomePage from '../pages/home/HomePage';
import User from './User';
import GroupPage from '../pages/groups/GroupPage';
import MessagesPage from '../pages/messages/MessagesPage';
import Chats from '../pages/messages/Chats';
import NotificationsPage from '../pages/notifications/NotificationsPage';

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
            <PrivateRoute path="/chats" component={Chats}/>
            <PrivateRoute path="/notifications" component={NotificationsPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;