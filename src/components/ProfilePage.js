import React from 'react';
import { connect } from 'react-redux';

const ProfilePage = ({ user }) => {
    console.log('user', user);
    return (
    <div>
        <h1> Profile Page </h1>
        { user ? 
            <div>
                <img src={user.photo_url} alt="user-photo" width="50px" height="60px"/>
                <h1> {user.display_name} </h1> 
                <h3> {user.title} </h3>
                <h3> {user.about} </h3>
                <div>
                    {user.interests.map(interest => (
                        <div>
                           <p> #{interest.toLowerCase()} </p> 
                        </div>    
                    ))}
                </div>
            </div>    
        : '' }
    </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user.userData
});

export default connect(mapStateToProps, undefined)(ProfilePage);