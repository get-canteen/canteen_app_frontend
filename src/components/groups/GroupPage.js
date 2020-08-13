import React from 'react';
import Modal from 'react-modal';
import { CloudFunctionManager } from '../../functions/functions';
import { fetchMemberStatus } from '../../actions/user';

class GroupPage extends React.Component {
    state = {
        accessCode: "",
        showModal: false,
        message: "",
        joinedStatus: false
    }
    async componentDidMount() {
        const { group } = this.props.location.state;
        const groupId = group[0];
        const joinedStatus = await fetchMemberStatus(groupId);
        this.setState({ joinedStatus: joinedStatus });
    }
    onClickJoin = async (type, group_id) => {
        if (type === "private") {
            this.setState({ showModal: true })
        } 
        if (type === "public") {
            try {
                const res = await CloudFunctionManager.joinGroup({ group_id });
                console.log("data: ", res.data);
                const { status, message, data } = res.data;
                if (status === "success") {
                    this.setState({ showModal: false });
                    console.log("successfully join public group");
                } 
                this.setState({ message })
            } catch (e) {
                console.log(e);
                this.setState({ message });
            }
        }
    }
    onChangeAccessCode = (e) => {
        const accessCode = e.target.value;
        this.setState({ accessCode })
    }
    onJoinPrivateGroup = async (group_id, access_code) => {
        try {
            const res = await CloudFunctionManager.joinGroup({ group_id, access_code });
            console.log("data: ", res.data);
            const { status, message, data } = res.data;
            if (status === "success") {
                this.setState({ showModal: false });
                console.log("successfully join private group");
            }             
            this.setState({ message })
        } catch (e) {
            console.log(e);
            this.setState({ message })
        }
    }
    onCloseModal = () => {
        this.setState({ showModal: false });
    }
    render() {
        const { group } = this.props.location.state;
        return (
            <div>
                <h1> Group Page </h1>
                <div> 
                    <img src={group[1].photo_url} width="80px" height="80px"/>
                    <p> {group[1].name} </p>
                    <p> {group[1].description} </p>
                    <p> {group[1].members + " members"} </p>
                    {
                        this.state.joinedStatus ? 
                        <button> Joined </button> :
                        <button 
                            onClick={() => this.onClickJoin(group[1].type, group[0])}
                        > 
                            Join 
                        </button>
                    }
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Enter access code to join group"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                >
                    <button onClick={this.onCloseModal}> X </button>
                    <label> Enter access code </label>
                    <input type="text" value={this.state.accessCode} onChange={this.onChangeAccessCode}/>
                    <button onClick={() => this.onJoinPrivateGroup(group[0], this.state.accessCode)}> Join </button>
                    <div>
                    { (this.state.message && this.state.showModal) && <p style={{color: "red"}}> {this.state.message} </p> }
                    </div>
                </Modal>
                <div>
                    { (this.state.message && !this.state.showModal) && <p style={{color: "red"}}> {this.state.message} </p> }
                </div>
            </div>
        )
    }
};

export default GroupPage;
