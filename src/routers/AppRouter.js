import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import ProfilePage from '../components/user/ProfilePage';
// import HomePage from '../components/HomePage';
// import SearchPage from '../components/SearchPage';
// import MessagesPage from '../components/MessagesPage';
// import NotificationsPage from '../components/NotificationsPage';
import NotFoundPage from '../components/shared/NotFoundPage';
import EditProfilePage from '../components/user/EditProfilePage';
import EditInterestPage from '../components/user/EditInterestPage';
import EditSkillPage from '../components/user/EditSkillPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        {/* <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
        <Switch> 
            <PublicRoute exact path="/" component={LoginPage}/>
            <PublicRoute path="/signup" component={SignupPage}/>
            <PublicRoute path="/forgot" component={ForgotPasswordPage}/>
            <PrivateRoute exact path="/profile" component={ProfilePage}/>
            <PrivateRoute exact path="/profile/edit" component={EditProfilePage}/>
            <PrivateRoute path="/profile/edit/interest" component={EditInterestPage}/>
            <PrivateRoute path="/profile/edit/skill/:type/:index" component={EditSkillPage}/> 
            {/* <Route path="/home" component={HomePage}/>
            <Route path="/search" component={SearchPage}/>
            <Route path="/messages" component={MessagesPage}/>
            <Route path="/notifications" component={NotificationsPage}/> */}
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;