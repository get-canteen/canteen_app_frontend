import React from 'react';
import GroupsList from '../../components/groups/GroupsList';
import PopularUsersList from '../../components/groups/PopularUsersList';

const HomePage = () => (
    <div>
        <h1> Home Page </h1>
        <input placeholder="Search Canteen"/>
        <GroupsList/>
        <PopularUsersList/>
    </div>
);

export default HomePage;
