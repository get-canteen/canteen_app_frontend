import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { CloudFunctionManager } from '../../functions/functions';

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
        const { group, posts, members, joined } = this.props.location.state;
        console.log("group: ", group);
        console.log("posts: ", posts);
        console.log("members: ", members);
        console.log("joined: ", joined);
        return (
            <div>
                <div>
                    <h1> Group Page </h1>
                    <div> 
                        <img src={group[1].photo_url} width="80px" height="80px"/>
                        <p> {group[1].name} </p>
                        <p> {group[1].description} </p>
                        <p> {group[1].members + " members"} </p>
                        {
                            joined ? 
                            <button> Joined </button> :
                            <button 
                                onClick={() => this.onClickJoin(group[1].type, group[0])}
                            > 
                                Join 
                            </button>
                        }
                    </div>
                    <br/>
                    <div>
                        { 
                            (this.state.message && !this.state.showModal) &&
                            <p style={{color: "red"}}> {this.state.message} </p> 
                        }
                    </div>
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
                                <div>
                                    {Object.entries(posts).map(([id, post]) => 
                                        <div key={id}>
                                            <img src={[members[post.from].photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
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
                                        <div key={id}>
                                            <img src={[member.photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
                                            <p> {member.display_name} </p>
                                            <p> {member.title} </p>
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
                    <button onClick={() => this.handleJoinPrivateGroup(group[0], this.state.accessCode)}> Join </button>
                    <div>
                        { 
                            (this.state.message && this.state.showModal) &&
                            <p style={{color: "red"}}> {this.state.message} </p> 
                        }
                    </div>
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(GroupPage);