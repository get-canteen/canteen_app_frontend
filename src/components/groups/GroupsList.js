import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { startFetchAllGroups } from '../../actions/groups';
import { fetchGroupMembers, fetchGroupPosts } from '../../actions/user';

class GroupsList extends React.Component {
    componentDidMount() {
        this.props.startFetchAllGroups();
        console.log("all groups: ", this.props.allGroups);
    }
    render() {
        return (
            <div>
                <h3> Groups List </h3>
                <input placeholder="Search Canteen"/>
                <div style={{listStyle: "none"}}>
                    <h3> Popular Groups </h3>
                    {this.props.allGroups.map((group, i) => (
                        <li
                            key={group[0]}
                            onClick={ async () => {
                                const posts = await fetchGroupPosts(group[0]);
                                const members = await fetchGroupMembers(group[0]);
                                const joined = !!members[this.props.user.uid];
                                history.push({
                                    pathname: `group/${group[0]}`,
                                    state: { group, posts, members, joined }
                                })
                            }}
                        >
                            <img src={group[1].photo_url} width="80px" height="80px"/>
                            <p> {i+1}. {group[1].name} </p>
                            <p> {group[1].type.charAt(0).toUpperCase() + group[1].type.slice(1) + " Group"} </p>
                            <p> {group[1].description} </p>
                            <p> {group[1].members + " members"} </p>
                        </li>
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
    user: state.auth.user,
    allGroups: state.groups
});

const mapDispatchToProps = (dispatch) => ({
    startFetchAllGroups: () => dispatch(startFetchAllGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
