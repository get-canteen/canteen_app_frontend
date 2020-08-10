import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startFetchAllGroups } from '../../actions/groups';

class GroupsList extends React.Component {
    componentDidMount() {
        this.props.startFetchAllGroups();
    }
    render() {
        console.log("groups: ", this.props.groups);
        return (
            <div>
                <h3> Groups List </h3>
                <input placeholder="Search Canteen"/>
                <div>
                    <h3> Popular Groups </h3>
                    {this.props.groups.map((group, i) => (
                        <Link 
                            key={group[0]} 
                            to={{
                                pathname: `/group/${group[0]}`,
                                state: { group }
                            }} 
                            style={{ textDecoration: 'none' }}
                        >
                            <img src={group[1].photo_url} width="80px" height="80px"/>
                            <p> {i+1}. {group[1].name} </p>
                            <p> {group[1].type.charAt(0).toUpperCase() + group[1].type.slice(1) + " Group"} </p>
                            <p> {group[1].description} </p>
                            <p> {group[1].members + " members"} </p>
                            <p> </p>
                        </Link>
                    ))}
                </div>
                <div>
                    <h3> Most Popular Users </h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    groups: state.groups
});

const mapDispatchToProps = (dispatch) => ({
    startFetchAllGroups: () => dispatch(startFetchAllGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
