import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { startSetAllGroups } from '../../actions/groups';
import { fetchGroupMembers, fetchGroupPosts } from '../../actions/user';

class GroupsList extends React.Component {
    async componentDidMount() {
        await this.props.startSetAllGroups();
        console.log("All groups: ", this.props.allGroups);
    }
    render() {
        return (
            <div>
                <h3> Groups List </h3>
                <input placeholder="Search Canteen"/>
                <div style={{listStyle: "none"}}>
                    <h3> Popular Groups </h3>
                    {Object.entries(this.props.allGroups).map(([id, group]) => (
                        <li
                            key={id}
                            onClick={ async () => {
                                const posts = await fetchGroupPosts(id);
                                const members = await fetchGroupMembers(id);
                                const joined = !!members[this.props.user.uid];
                                history.push({
                                    pathname: `group/${id}`,
                                    state: { group, posts, members, joined }
                                })
                            }}
                        >
                            <img src={[group.photo_url || "/images/anonymous.png"]} width="80px" height="80px"/>
                            <p> {group.name} </p>
                            <p> {group.type.charAt(0).toUpperCase() + group.type.slice(1) + " Group"} </p>
                            <p> {group.description} </p>
                            <p> {group.members + " members"} </p>
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
    allGroups: state.groups.allGroups
});

const mapDispatchToProps = (dispatch) => ({
    startSetAllGroups: () => dispatch(startSetAllGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
