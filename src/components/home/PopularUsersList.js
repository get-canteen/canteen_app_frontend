import React from 'react';
import  { connect } from 'react-redux';
import database from '../../../firebase/firebase';

class PopularUsersList extends React.Component {
    state = { 
        popularUsers: null 
    };
    async componentDidMount() {
        try {
            const popularUsersSnapshot = await database.collection("discover").doc("1m6PLb3T1Lx3iGNEwFZ3").collection("users").get();
            const popularUsers = {};
            await popularUsersSnapshot.forEach((doc) => { 
                popularUsers[doc.id] = {
                    ...doc.data()
                }
            });
            console.log("popular users: ", popularUsers);
            Object.entries(popularUsers).forEach(async ([id, user]) => {
                const { user_id } = user;
                const userSnapshot = await database.collection("users").doc(user_id).get();
                if (!userSnapshot) {
                    throw Error("User does not exist");
                }
                popularUsers[id] = {
                    ...user,
                    ...userSnapshot.data()
                }
            })
            console.log("popular users: ", popularUsers);
            this.setState({ popularUsers });
        } catch (e) {
            console.error("Error fetching popular users", e);
        }
    }
    render() {
        return (
            <div>
                <h3> Popular Users List </h3>
                {
                    this.state.popularUsers && Object.entries(this.state.popularUsers).map(([id, user]) => {
                        const { user_id, display_name, photo_url, title, duration, name, price, rank } = user;
                        return (
                            <div key={id}>
                                <img src={photo_url || "/images/anonymous.png"} alt="profile photo" width="80px" height="100px"/>
                                <p> {display_name} </p>
                                <p> {title} </p>
                                <p> {name} </p>
                                <p> {duration} </p>
                                <p> {price} </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUid: state.auth.user.uid
});

export default connect(mapStateToProps)(PopularUsersList);