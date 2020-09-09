import React from 'react';
import { CloudFunctionManager } from '../../functions/functions';

class PopularUsersList extends React.Component {
    state = { 
        popularUsers: {} 
    };
    async componentDidMount() {
        try {
            await CloudFunctionManager.generateMostPopularUsers();
            const snapshot = await database.collection("discover").get();
            const popularUsers = {};
            snapshot.forEach(doc => { 
                popularUsers[doc.id] = doc.data();
            });
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
            </div>
        )
    }
}

export default PopularUsersList;