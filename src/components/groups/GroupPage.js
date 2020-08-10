import React from 'react';

const GroupPage = (props) => {
    const { group } = props.location.state;
    return (
        <div>
            <h1> Group Page </h1>
            <div> 
                <img src={group[1].photo_url} width="80px" height="80px"/>
                <p> {group[1].name} </p>
                <p> {group[1].description} </p>
                <p> {group[1].members + " members"} </p>
            </div>
        </div>
    )
};

export default GroupPage;
