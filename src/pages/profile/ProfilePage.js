import React from 'react';
import database from '../../../firebase/firebase';
import ProfileInfo from '../../components/profile/ProfileInfo';
import PropTypes from 'prop-types';

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
        return (
            <div>
                <h1> Profile Page </h1>
                { this.state.user &&
                    <ProfileInfo user={this.state.user} match={this.props.match}/>
                }
            </div>
        )
    }
};

ProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProfilePage;