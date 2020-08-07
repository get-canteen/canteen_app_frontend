import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import ProfilePage from '../components/user/ProfilePage';
import NotFoundPage from '../components/shared/NotFoundPage';
import EditProfilePage from '../components/user/EditProfilePage';
import EditInterestPage from '../components/user/EditInterestPage';
import EditPhotoPage from '../components/user/EditPhotoPage';
import AddSkillPage from '../components/user/AddSkillPage';
import EditSkillPage from '../components/user/EditSkillPage';
import SearchPage from '../components/groups/SearchPage';
import MessagesPage from '../components/messages/MessagesPage';
import NotificationsPage from '../components/notifications/NotificationsPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch> 
            <PublicRoute exact path="/" component={LoginPage}/>
            <PublicRoute path="/signup" component={SignupPage}/>
            <PublicRoute path="/forgot" component={ForgotPasswordPage}/>
            <PrivateRoute exact path="/profile" component={ProfilePage}/>
            <PrivateRoute exact path="/profile/edit" component={EditProfilePage}/>
            <PrivateRoute path="/profile/edit/interest" component={EditInterestPage}/>
            <PrivateRoute path="/profile/add/:type" component={AddSkillPage}/> 
            <PrivateRoute path="/profile/edit/:type/:index" component={EditSkillPage}/> 
            <PrivateRoute path="/profile/edit/photo" component={EditPhotoPage}/> 
            <PrivateRoute path="/search" component={SearchPage}/>
            <PrivateRoute path="/messages" component={MessagesPage}/>
            <PrivateRoute path="/notifications" component={NotificationsPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;