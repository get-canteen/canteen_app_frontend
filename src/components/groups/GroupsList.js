import React from 'react';
import { connect } from 'react-redux';
import { startFetchGroups } from '../../actions/groups';

class GroupsList extends React.Component {
    componentDidMount() {
        this.props.startFetchGroups();
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
                        <div key={i}>
                            <img src={group.photo_url} width="80px" height="80px"/>
                            <p> {i+1}. {group.name} </p>
                            <p> {group.type.charAt(0).toUpperCase() + group.type.slice(1) + " Group"} </p>
                            <p> {group.description} </p>
                            <p> {group.members + " members"} </p>
                            <p> </p>
                        </div>
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
    startFetchGroups: () => dispatch(startFetchGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
