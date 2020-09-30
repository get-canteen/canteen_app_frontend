import React from 'react';
import  { connect } from 'react-redux';
import database from '../../../firebase/firebase';

class PopularUsersList extends React.Component {
    state = { 
        popularUsers: null 
    };
    async componentDidMount() {
        try {
            const discoverId = await database.collection("discover")
                .where("active", "==", true)
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot) {
                        return null;
                    }
                    return querySnapshot.docs[0].id;
                })

            const popularUsers = await database.collection("discover").doc(discoverId).collection("users").get()
                .then((querySnapshot) => {
                    const users = {};
                    querySnapshot.forEach((doc) => {
                        users[doc.id] = { ...doc.data() }
                    })
                    return users;
                })
                .then((users) => {
                    Object.entries(users).forEach(([id, entry]) => {
                        const { user_id } = entry;
                        database.collection("users").doc(user_id).get()
                            .then((querySnapshot) => {
                                if (!querySnapshot) {
                                    throw Error("User does not exist");
                                }
                                users[id] = {
                                    ...entry,
                                    ...querySnapshot.data()
                                }
                            });
                    })
                    return users;
                })  

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
                    this.state.popularUsers && Object.values(this.state.popularUsers).map((entry) => {
                        console.log("popularUsers: ", this.state.popularUsers);
                        console.log("entry: ", entry);
                        const { user_id, duration, name, price, rank, display_name, photo_url, title } = entry;
                        return (
                            <div key={user_id}>
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