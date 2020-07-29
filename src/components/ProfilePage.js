import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const ProfilePage = ({ user, startLogout }) => {
    // console.log('user', user);
    // const { photo_url, display_name, title, about } = user;
    return (
    <div>
        <h1> Profile Page </h1>
        {/* { userData ? 
            <div>
                <img src={photo_url} alt="user-photo"/>
                <h3> {display_name} </h3> 
                <h4> {title} </h4>
                <h6> {about} </h6>
            </div>    
        : '' } */}
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