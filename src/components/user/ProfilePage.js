import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = (props) => {
    const { id } = props.match.params;
    const { user } = props.location.state;
    const isAuthUser = id === props.authUid;
    return (
        <div>
            <h1> Profile Page </h1>
            { user &&
                <div> 
                    {   
                        isAuthUser &&
                        <Link to={`/profile/${id}/edit`} style={{ textDecoration: 'none' }}> 
                            <h3> Edit Profile </h3> 
                        </Link>
                    }
                    <img src={user.photo_url || "/images/anonymous.png"} alt="profile photo" width="80px" height="100px"/>
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
                                <div>
                                    { 
                                        !isAuthUser 
                                        && 
                                        <Link 
                                            to={{ pathname: `/profile/${id}/request`, user, skill }}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Connect
                                        </Link>
                                    }
                                </div>
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
                                { 
                                    !isAuthUser && 
                                    <Link 
                                        to={{ pathname: `/profile/${id}/request`, user, skill }}
                                        style={{ textDecoration: 'none' }}
                                    > 
                                        Connect 
                                    </Link> 
                                }
                            </div>
                        ))}
                    </div>
                </div>    
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    authUid: state.auth.user.uid
})

export default connect(mapStateToProps)(ProfilePage);