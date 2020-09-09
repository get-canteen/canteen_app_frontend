import React from 'react';
import { CloudFunctionManager } from '../../functions/functions';

class PopularUsersList extends React.Component {
    state = { 
        popularUsersList: {} 
    };
    async componentDidMount() {
        try {
            const res = await CloudFunctionManager.generateMostPopularUsers();
            console.log(res.data());
            this.setState({ popularUsersList });
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