import React from 'react';
import GroupsList from '../../components/groups/GroupsList';

const HomePage = () => (
    <div>
        <h1> Home Page </h1>
        <input placeholder="Search Canteen"/>
        <GroupsList/>
        <div>
            <h3> Most Popular Users </h3>
        </div>
    </div>
);

export default HomePage;
