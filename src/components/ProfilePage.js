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
                <h3> {user.display_name} </h3> 
                <h6> {user.title} </h6>
                <h6> {user.about} </h6>
                <div>
                    <h3> Interests </h3>
                    {user.interests.map(interest => (
                        <div>
                           <h6> #{interest.toLowerCase()} </h6> 
                        </div>    
                    ))}
                </div>
                <div>
                    <h3> Offerings </h3>
                    {Object.values(user.learn_skill).map((skill, i) => (
                        <div key={i}>
                            <h4> {skill.name} </h4>
                            <h6> {skill.description} </h6>
                            <h6> ${skill.price} / {skill.duration} minutes </h6>
                        </div>
                    ))}
                </div>
                <div>
                    <h3> Asks </h3>
                    {Object.values(user.teach_skill).map((skill, i) => (
                        <div key={i}>
                            <h4> {skill.name} </h4>
                            <h6> {skill.description} </h6>
                            <h6> ${skill.price} / {skill.duration} minutes </h6>
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