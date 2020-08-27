import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import { Colors, Spacing } from '../constants/constants';

import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
// import LandingPage from '../components/shared/LandingPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import ProfilePage from '../components/user/ProfilePage';
import NotFoundPage from '../components/shared/NotFoundPage';
import EditProfilePage from '../components/user/EditProfilePage';
import EditInterestPage from '../components/user/EditInterestPage';
import AddSkillPage from '../components/user/AddSkillPage';
import EditSkillPage from '../components/user/EditSkillPage';
import RequestForm from '../components/matches/RequestForm';
import HomePage from '../components/shared/HomePage';
import GroupPage from '../components/groups/GroupPage';
import MessagesPage from '../components/messages/MessagesPage';
import NotificationsPage from '../components/notifications/NotificationsPage';

export const history = createBrowserHistory();

const BoxLayout = styled.div`
    color: ${Colors.dark_grey};
    font-family: Helvetica, Arial, sans-serif;
    font-size: ${Spacing.s_size};
    line-height: 1.6;
`;

const AppRouter = () => (
    <BoxLayout>
        <Router history={history}>
            <Switch>
                {/* <PublicRoute path="/" component={LandingPage}/>  */}
                <PublicRoute exact path="/" component={LoginPage}/>
                <PublicRoute path="/signup" component={SignupPage}/>
                <PublicRoute path="/forgot" component={ForgotPasswordPage}/>
                <PrivateRoute path="/search" component={HomePage}/>
                <PrivateRoute exact path="/profile/:id" component={ProfilePage}/>
                <PrivateRoute exact path="/profile/:id/edit" component={EditProfilePage}/>
                <PrivateRoute path="/profile/:id/edit/interest" component={EditInterestPage}/>
                <PrivateRoute path="/profile/:id/add/:type" component={AddSkillPage}/> 
                <PrivateRoute path="/profile/:id/edit/:type/:index" component={EditSkillPage}/> 
                <PrivateRoute path="/profile/:id/request" component={RequestForm}/> 
                <PrivateRoute path="/group/:id" component={GroupPage}/>
                <PrivateRoute path="/messages" component={MessagesPage}/>
                <PrivateRoute path="/notifications" component={NotificationsPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    </BoxLayout>
);
  
export default AppRouter;