import React from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGroups } from '../../actions/groups';

class GroupsList extends React.Component {
    state = { 
        allGroups: {} 
    };
    async componentDidMount() {
        try {
            const allGroups = await fetchAllGroups();
            this.setState({ allGroups });
        } catch (e) {
            console.error("Error fetching groups", e);
        }
    }
    render() {
        return (
            <div>
                <h3> Popular Groups </h3>
                {Object.entries(this.state.allGroups).map(([id, group]) => (
                    <Link
                        key={id}
                        to={{
                            pathname: `/group/${id}`,
                            state: { group }
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <img src={[group.photo_url || "/images/anonymous.png"]} width="80px" height="80px"/>
                        <p> {group.name} </p>
                        <p> {group.type.charAt(0).toUpperCase() + group.type.slice(1) + " Group"} </p>
                        <p> {group.description} </p>
                        <p> {group.members + " members"} </p>
                    </Link>
                ))}
            </div>
        )
    }
}

export default GroupsList;

