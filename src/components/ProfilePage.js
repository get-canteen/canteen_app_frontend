import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const ProfilePage = ({ user, startLogout }) => {
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
            </div>    
        : '' }
        <button onClick={startLogout}> Logout </button>
    </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);