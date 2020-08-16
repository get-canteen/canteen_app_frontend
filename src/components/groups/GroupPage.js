import React from 'react';
import database from '../../../firebase/firebase';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { GroupPosts } from './GroupPosts';
import { GroupMembers } from './GroupMembers';
import { CloudFunctionManager } from '../../functions/functions';

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
        console.log("isMember:", this.props.isMember);
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
                const { status, message } = res.data;
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
                            <GroupPosts posts={this.state.posts} members={this.state.members}/>
                        } 
                    </div>
                    <div>
                        {
                            this.state.showMembers &&
                            <GroupMembers members={this.state.members}/>
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

const mapStateToProps = (state, props) => ({
    isMember: !!state.groups.userGroups[[props.match.params.id]]
})

export default connect(mapStateToProps)(GroupPage);



// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { useEffect, useDispatch, useSelector } from "react-redux";
// import Modal from 'react-modal';
// import { GroupPosts } from './GroupPosts';
// import { GroupMembers } from './GroupMembers';
// import { CloudFunctionManager } from '../../functions/functions';
// import database, { firebase } from '../../../firebase/firebase';

// const GroupPage = () => {
//     const [posts, setPosts] = useState('');
//     const [members, setMembers] = useState('');
//     const [showPosts, setShowPosts] = useState(true);
//     const [showMembers, setShowMembers] = useState(false);
//     const [accessCode, setAccessCode] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [message, setMessage] = useState('');

//     const groupId = props.match.params.id;
//     const { group } = props.location.state;
//     const userGroups = useSelector(state => state.groups.userGroups);
//     const isMember = !!userGroups[groupId];

//     useEffect(() => {
//         const unsubscribe = async () => {
//             if (group.type==="private" && !isMember) {
//                 return "Posts are private. Join the group to view posts."
//             } else {
//                 await database.collection("groups").doc(groupId).collection("posts").onSanpshot((snapshot) => {
//                     const data = {};
//                     snapshot.forEach(doc => {
//                         data[doc.id] = doc.data();
//                     })
//                     setPosts(data); 
//                 })
//                 await database.collection("groups").doc(groupId).collection("members").onSanpshot((snapshot) => {
//                     const data = {};
//                     snapshot.forEach(doc => {
//                         data[doc.id] = doc.data();
//                     })
//                     setMembers(data); 
//                 })
//             }
//         }
//         return () => {
//             unsubscribe()
//         }
//     }, [firebase])  

//     const handleShowPosts = () => {
//         setShowPosts(true);
//         setShowMembers(false);
//     }

//     const handleShowMembers = () => {
//         setShowMembers(true); 
//         setShowPosts(false);
//     }

//     const onClickJoin = async (type, group_id) => {
//         console.log("onClickJoin is called");
//         if (type === "private") {
//             setShowModal(true);
//         } 
//         if (type === "public") {
//             try {
//                 const res = await CloudFunctionManager.joinGroup({ group_id });
//                 const { status, message } = res.data;
//                 if (status === "success") {
//                     setShowModal(false);
//                     console.log("successfully join public group");
//                 } 
//                 setMessage(message);
//             } catch (e) {
//                 console.log(e);
//                 console.log("failed to join public group");
//             }
//         }
//     }  

//     const onChangeAccessCode = (e) => {
//         const accessCode = e.target.value;
//         setAccessCode(accessCode)
//     }

//     const handleJoinPrivateGroup = async (group_id, access_code) => {
//         try {
//             console.log("handleJoinPrivateGroup is called");
//             const res = await CloudFunctionManager.joinGroup({ group_id, access_code });
//             const { status, message } = res.data;
//             if (status === "success") {
//                 setShowModal(false);
//                 console.log("successfully join private group");
//             }             
//             setMessage(message);
//         } catch (e) {
//             console.log(e);
//             console.log("failed to join private group");
//         }
//     }

//     const handleCloseModal = () => {
//         setShowModal(false);
//     }

//     return (
//             <div>
//                 <h1> Group Page </h1>
//                 <div> 
//                     <img src={group.photo_url} width="80px" height="80px"/>
//                     <p> {group.name} </p>
//                     <p> {group.description} </p>
//                     <p> {group.members + " members"} </p>
//                     {
//                         props.isMember ? 
//                         <button> Joined </button> :
//                         <button 
//                             onClick={() => onClickJoin(group.type, groupId)}
//                         > 
//                             Join 
//                         </button>
//                     }
//                 </div>
//                 <br/>
//                 { 
//                     (message && !showModal) &&
//                     <p style={{color: "red"}}> {message} </p> 
//                 }
//                 <br/>
//                 <div>
//                     <div>
//                         <button onClick={handleShowPosts}> Posts </button>
//                         <button onClick={handleShowMembers}> Members </button>
//                     </div>
//                     <br/>
//                     <div>
//                         {
//                             showPosts && 
//                             <GroupPosts posts={posts} members={members}/>
//                         } 
//                     </div>
//                     <div>
//                         {
//                             showMembers &&
//                             <GroupMembers members={members}/>
//                         }
//                     </div>
//                 </div>
//                 <Modal
//                     isOpen={showModal}
//                     contentLabel="Enter access code to join private group"
//                     ariaHideApp={false}
//                     shouldCloseOnOverlayClick={true}
//                     shouldCloseOnEsc={true}
//                 >
//                     <button onClick={handleCloseModal}> X </button>
//                     <label> Enter access code </label>
//                     <input type="text" value={accessCode} onChange={onChangeAccessCode}/>
//                     <button onClick={() => handleJoinPrivateGroup(groupId, accessCode)}> Join </button>
//                     { 
//                         (message && showModal) &&
//                         <p style={{color: "red"}}> {message} </p> 
//                     }
//                 </Modal>
//             </div>
//         )
// }

// export default GroupPage;