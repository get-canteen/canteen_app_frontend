import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GroupMembers = ({ members }) => (
    <div>
        {
            typeof members === 'object' ? 
            Object.entries(members).map(([id, member]) => 
                <div key={id}>
                    <Link 
                        to={`/profile/${id}`} 
                        style={{textDecoration: "none"}}
                    >
                        <img src={[member.photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
                        <p> {member.display_name} </p>
                        <p> {member.title} </p>
                    </Link>
                </div>
            ) : 
            <p style={{color: "red"}}> {members} </p>    
        }
    </div>
)

GroupMembers.propTypes = {
    members: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired
};

export default GroupMembers;