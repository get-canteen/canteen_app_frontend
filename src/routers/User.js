import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import EditInterestPage from '../pages/profile/EditInterestPage';
import AddSkillPage from '../pages/profile/AddSkillPage';
import EditSkillPage from '../pages/profile/EditSkillPage';
import ConnectForm from '../components/matches/ConnectForm';

const User = ({ match }) => (
    <Switch>
        <Route exact path={`${match.path}`} component={ProfilePage}/>
        <Route exact path={`${match.path}/edit`} component={EditProfilePage}/>
        <Route path={`${match.path}/edit/interest`} component={EditInterestPage}/>
        <Route exact path={`${match.path}/add/:type`} component={AddSkillPage}/> 
        <Route path={`${match.path}/edit/:type/:index`} component={EditSkillPage}/> 
        <Route path={`${match.path}/connect`} component={ConnectForm}/> 
    </Switch>
);
  
export default User;
