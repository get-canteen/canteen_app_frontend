import React from 'react';
import GroupsList from '../../components/home/GroupsList';
import PopularUsersList from '../../components/home/PopularUsersList';

const HomePage = () => (
    <div>
        <h1> Home Page </h1>
        <input placeholder="Search Canteen"/>
        <GroupsList/>
        <PopularUsersList/>
    </div>
);

export default HomePage;
