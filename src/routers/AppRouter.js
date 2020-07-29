import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';
import NotFoundPage from '../components/NotFoundPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        {/* <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
        <Switch> 
            <Route exact path="/" component={LoginPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;