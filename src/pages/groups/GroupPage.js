import React from 'react';
import database from '../../../firebase/firebase';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import GroupPosts from '../../components/groups/GroupPosts';
import GroupMembers from '../../components/groups/GroupMembers';
import { CloudFunctionManager } from '../../functions/functions';
import PropTypes from 'prop-types';

class GroupPage extends React.Component {
    state = {
        posts: {},
        members: {},
        showPosts: true,
        showMembers: false,
        accessCode: "",
        showModal: false,
        message: ""
    }
    async componentDidMount() {
        const groupId = this.props.match.params.id;
        const { group } = this.props.location.state;
        if (group.type==="private" && !this.props.isMember) {
            this.setState({
                posts: "Posts are private. Join the group to view posts.",
                members: "Members are private. Join the group to view members."
            })
        } else {
            await database.collection("groups").doc(groupId).collection("members").onSnapshot((snapshot) => {
                const members = {};
                snapshot.forEach(doc => {
                    members[doc.id] = doc.data();
                })
                this.setState({ members });
                console.log("members:", members);
            })
            await database.collection("groups").doc(groupId).collection("posts").onSnapshot((snapshot) => {
                const posts = {};
                snapshot.forEach(doc => {
                    posts[doc.id] = doc.data();
                })
                this.setState({ posts });
                console.log("posts:", posts);
            })
        }
    }
    handleShowPosts = () => {
        this.setState({ showPosts: true, showMembers: false });
    }
    handleShowMembers = () => {
        this.setState({ showMembers: true, showPosts: false });
    }
    onClickJoin = async (type, group_id) => {
        console.log("onClickJoin is called");
        if (type === "private") {
            this.setState({ showModal: true });
        } 
        if (type === "public") {
            try {
                const res = await CloudFunctionManager.joinGroup({ group_id });
                console.log("res:", res);
                const { status, message, data } = res.data;
                if (status === "success") {
                    this.setState({ showModal: false });
                    console.log("successfully join public group");
                } 
                this.setState({ message });
            } catch (e) {
                console.log(e);
                console.log("failed to join public group");
            }
        }
    }
    onChangeAccessCode = (e) => {
        const accessCode = e.target.value;
        this.setState({ accessCode })
    }
    handleJoinPrivateGroup = async (group_id, access_code) => {
        try {
            console.log("handleJoinPrivateGroup is called");
            const res = await CloudFunctionManager.joinGroup({ group_id, access_code });
            const { status, message } = res.data;
            if (status === "success") {
                this.setState({ showModal: false });
                console.log("successfully join private group");
            }             
            this.setState({ message })
        } catch (e) {
            console.log(e);
            console.log("failed to join private group");
        }
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    render() {
        const groupId = this.props.match.params.id;
        const { group } = this.props.location.state;
        console.log("group:", group);
        return (
            <div>
                <h1> Group Page </h1>
                <div> 
                    <img src={group.photo_url} width="80px" height="80px"/>
                    <p> {group.name} </p>
                    <p> {group.description} </p>
                    <p> {group.members + " members"} </p>
                    {
                        this.props.isMember ? 
                        <button> Joined </button> :
                        <button 
                            onClick={() => this.onClickJoin(group.type, groupId)}
                        > 
                            Join 
                        </button>
                    }
                </div>
                { 
                    (this.state.message && !this.state.showModal) &&
                    <p style={{color: "red"}}> {this.state.message} </p> 
                }
                <div>
                    <div>
                        <button onClick={this.handleShowPosts}> Posts </button>
                        <button onClick={this.handleShowMembers}> Members </button>
                    </div>
                    <br/>
                    <div>
                        {
                            this.state.showPosts && 
                            <GroupPosts groupId={groupId} posts={this.state.posts} members={this.state.members}/>
                        } 
                    </div>
                    <div>
                        {
                            this.state.showMembers &&
                            <GroupMembers groupId={groupId} members={this.state.members}/>
                        }
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Enter access code to join private group"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                >
                    <button onClick={this.handleCloseModal}> X </button>
                    <label> Enter access code </label>
                    <input type="text" value={this.state.accessCode} onChange={this.onChangeAccessCode}/>
                    <button onClick={() => this.handleJoinPrivateGroup(groupId, this.state.accessCode)}> Join </button>
                    { 
                        (this.state.message && this.state.showModal) &&
                        <p style={{color: "red"}}> {this.state.message} </p> 
                    }
                </Modal>
            </div>
        )
    }
};

GroupPage.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isMember: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
    isMember: !!state.groups.userGroups[[props.match.params.id]]
})

export default connect(mapStateToProps)(GroupPage);

