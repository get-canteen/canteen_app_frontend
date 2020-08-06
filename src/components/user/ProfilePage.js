import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = ({ user }) => {
    return (
    <div>
        <h1> Profile Page </h1>
        <Link to="/profile/edit"> <h3> Edit </h3> </Link>
        { user ? 
            <div>
                <img src={user.photo_url} alt="user-photo" width="50px" height="60px"/>
                <h3> {user.display_name} </h3> 
                <h4> {user.title} </h4>
                <p> {user.about} </p>
                <div>
                    <h3> Interests </h3>
                    {user.interests.map((interest, i) => (
                        <div key={i}>
                           <p> #{interest.toLowerCase()} </p> 
                        </div>    
                    ))}
                </div>
                <div>
                    <h3> Offerings </h3>
                    {Object.values(user.teach_skill).map((skill, i) => (
                        <div key={i}>
                            <p> {i+1}. {skill.name} </p>
                            <p> {skill.description} </p>
                            <p> ${skill.price} / {skill.duration} minutes </p>
                        </div>
                    ))}
                </div>
                <div>
                    <h3> Asks </h3>
                    {Object.values(user.learn_skill).map((skill, i) => (
                        <div key={i}>
                            <p> {i+1}. {skill.name} </p>
                            <p> {skill.description} </p>
                            <p> ${skill.price} / {skill.duration} minutes </p>
                        </div>
                    ))}
                </div>
            </div>    
        : '' }
    </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, undefined)(ProfilePage);