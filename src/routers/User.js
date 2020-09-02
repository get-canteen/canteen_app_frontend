import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfilePage from '../components/user/ProfilePage';
import EditProfilePage from '../components/user/EditProfilePage';
import EditInterestPage from '../components/user/EditInterestPage';
import AddSkillPage from '../components/user/AddSkillPage';
import EditSkillPage from '../components/user/EditSkillPage';
import ConnectForm from '../components/matches/ConnectForm';

const User = ({ match }) => (
    <Switch>
        <Route exact path={`${match.path}`} component={ProfilePage}/>
        <Route exact path={`${match.path}/edit`} component={EditProfilePage}/>
        <Route path={`${match.path}/edit/interest`} component={EditInterestPage}/>
        <Route exact path={`${match.path}/edit/:type`} component={AddSkillPage}/> 
        <Route path={`${match.path}/edit/:type/:index`} component={EditSkillPage}/> 
        <Route path={`${match.path}/connect`} component={ConnectForm}/> 
    </Switch>
);
  
export default User;
