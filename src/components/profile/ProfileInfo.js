import React from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileInfo = ({ match, user, isAuthUser }) => {
    const { display_name, photo_url, title, about, interests, teach_skill, learn_skill } = { ...user };
    console.log("id: ", match.params.id);
    return (
        <div> 
            {   
                isAuthUser &&
                <div>
                    <Link 
                        to={`${match.url}/edit`} 
                        style={{ textDecoration: 'none' }}
                    > 
                        <h3> Edit Profile </h3>
                    </Link>
                </div>
            }
            <img src={photo_url || "/images/anonymous.png"} alt="profile photo" width="80px" height="100px"/>
            <h3> {display_name} </h3> 
            <h4> {title} </h4>
            <p> {about} </p>
            <div>
                <h3> Interests </h3>
                <div>
                    {interests.map((interest, i) => (
                        <div key={i}>
                            <p> #{interest.toLowerCase()} </p> 
                        </div>    
                    ))}
                </div>
            </div>
            { 
                !isAuthUser && 
                <Link 
                    to={`${match.url}/connect`}
                    style={{ textDecoration: 'none' }}
                > 
                    <h3> Connect </h3>
                </Link> 
            }
            <div>
                <h3> Offerings </h3>
                { 
                    (!isAuthUser && Object.entries(teach_skill).length === 0) ? 
                    <div style={{ color: "red" }}>
                        <p> {display_name} hasn't posted any offerings </p>
                        <p> When they do, they will show up here </p>
                    </div> :
                    <div> 
                        {Object.values(teach_skill).map((skill, i) => (
                            <div key={i}>
                                <p> {i+1}. {skill.name} </p>
                                <p> {skill.description} </p>
                                <p> ${skill.price} / {skill.duration} minutes </p>
                            </div>
                        ))} 
                    </div>
                }
            </div>
            <div>
                <h3> Asks </h3>
                { 
                    (!isAuthUser && Object.entries(learn_skill).length === 0) ? 
                    <div style={{ color: "red" }}>
                        <p> {display_name} hasn't posted any asks </p>
                        <p> When they do, they will show up here </p>
                    </div> :
                    <div>
                        {Object.values(learn_skill).map((skill, i) => (
                            <div key={i}>
                                <p> {i+1}. {skill.name} </p>
                                <p> {skill.description} </p>
                                <p> ${skill.price} / {skill.duration} minutes </p>
                            </div>
                        ))} 
                    </div>
                }
            </div>
        </div>  
    )
}

ProfileInfo.propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isAuthUser: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
    isAuthUser: props.match.params.id === state.auth.user.uid
})

export default connect(mapStateToProps)(ProfileInfo);