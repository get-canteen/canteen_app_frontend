import React from 'react';
import database from '../../../firebase/firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProfilePage extends React.Component {
    state = { 
        user: null
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const snapshot = await database.collection("users").doc(id).get();
            this.setState({
                user: snapshot.data()
            })
        } catch (e) {
            console.error("Error fetching user", e);
        }
    }
    render() {
        const { match } = this.props;
        const { display_name, photo_url, title, about, interests, teach_skill, learn_skill } = { ...this.state.user };
        const isAuthUser = match.params.id === this.props.authUid;
        return (
            <div>
                <h1> Profile Page </h1>
                { this.state.user &&
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
                                            <p> {skill.name} </p>
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
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    authUid: state.auth.user.uid
})

export default connect(mapStateToProps)(ProfilePage);