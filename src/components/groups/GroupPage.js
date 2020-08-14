import React from 'react';
import { history } from '../../routers/AppRouter';
import Modal from 'react-modal';
import { CloudFunctionManager } from '../../functions/functions';
import { fetchUserDocument } from '../../actions/user';

class GroupPage extends React.Component {
    state = {
        accessCode: "",
        showModal: false,
        message: "",
        showPosts: true,
        showMembers: false
    }
    onClickJoin = async (type, group_id) => {
        if (type === "private") {
            this.setState({ showModal: true })
        } 
        if (type === "public") {
            try {
                const res = await CloudFunctionManager.joinGroup({ group_id });
                const { status, message } = res.data;
                if (status === "success") {
                    this.setState({ showModal: false });
                } 
                this.setState({ message })
            } catch (e) {
                console.log(e);
            }
        }
    }
    onChangeAccessCode = (e) => {
        const accessCode = e.target.value;
        this.setState({ accessCode })
    }
    handleJoinPrivateGroup = async (group_id, access_code) => {
        try {
            const res = await CloudFunctionManager.joinGroup({ group_id, access_code });
            const { status, message } = res.data;
            if (status === "success") {
                this.setState({ showModal: false })
            }             
            this.setState({ message })
        } catch (e) {
            console.log(e);
        }
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    handleShowPosts = async () => {
        this.setState({ showPosts: true, showMembers: false });
    }
    handleShowMembers = () => {
        this.setState({ showMembers: true, showPosts: false });
    }
    render() {
        const { id } = this.props.match.params;
        const { group, posts, members, joined } = this.props.location.state;
        return (
            <div>
                <div>
                    <h1> Group Page </h1>
                    <div> 
                        <img src={group.photo_url} width="80px" height="80px"/>
                        <p> {group.name} </p>
                        <p> {group.description} </p>
                        <p> {group.members + " members"} </p>
                        {
                            joined ? 
                            <button> Joined </button> :
                            <button 
                                onClick={() => this.onClickJoin(group.type, id)}
                            > 
                                Join 
                            </button>
                        }
                    </div>
                    <br/>
                    { 
                        (this.state.message && !this.state.showModal) &&
                        <p style={{color: "red"}}> {this.state.message} </p> 
                    }
                    <br/>
                    <div>
                        <div>
                            <button onClick={this.handleShowPosts}> Posts </button>
                            <button onClick={this.handleShowMembers}> Members </button>
                        </div>
                        <br/>
                        <div>
                            {
                                this.state.showPosts && 
                                <div style={{listStyle: "none"}}>
                                    {Object.entries(posts).map(([id, post]) => 
                                        <div key={id}>
                                            <li
                                                onClick={ async () => {
                                                    const user = await fetchUserDocument(post.from);
                                                    history.push({
                                                        pathname: `/profile/${post.from}`,
                                                        state: { user: user }
                                                    })
                                                }}
                                            >
                                                <img src={[members[post.from].photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
                                            </li>
                                            <p> {[members[post.from].display_name]} </p>
                                            <p> {[members[post.from].title]} </p>
                                            <p> {post.message} </p>
                                            <div>
                                                <p> {post.like_count} </p>
                                            </div>
                                            <div>
                                                <p> {post.comment_count} </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            } 
                        </div>
                        <div>
                            {
                                this.state.showMembers &&
                                <div>
                                    {Object.entries(members).map(([id, member]) => 
                                        <div key={id} style={{listStyle: "none"}}>
                                            <li
                                                onClick={ async () => {
                                                    const user = await fetchUserDocument(id);
                                                    history.push({
                                                        pathname: `/profile/${id}`,
                                                        state: { user: user }
                                                    })
                                                }}
                                            >
                                                <img src={[member.photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
                                                <p> {member.display_name} </p>
                                                <p> {member.title} </p>
                                            </li>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                    <br/>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Enter access code to join group"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                >
                    <button onClick={this.handleCloseModal}> X </button>
                    <label> Enter access code </label>
                    <input type="text" value={this.state.accessCode} onChange={this.onChangeAccessCode}/>
                    <button onClick={() => this.handleJoinPrivateGroup(id, this.state.accessCode)}> Join </button>
                    { 
                        (this.state.message && this.state.showModal) &&
                        <p style={{color: "red"}}> {this.state.message} </p> 
                    }
                </Modal>
            </div>
        )
    }
};

export default GroupPage;
