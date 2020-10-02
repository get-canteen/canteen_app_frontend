import React from 'react';
import { connect } from 'react-redux';
import { startFetchMessages } from '../../actions/matches';
import moment from 'moment';
import database from '../../../firebase/firebase';
import { CloudFunctionManager } from '../../functions/functions';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../../reducers/matches';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware())
);

class Chats extends React.Component {

    state = {
        messages: {},
        chats: {},
        content: '',
        timestamp: '',
        request: {},
        notes: {}
    }


    async componentDidMount() {
        //this.props.authUid
        const authUid = '3uJrPEDpXLXN6R8dKmcWXgGPVzf2If9DejkPFdVo5Qf56HRmOlXcMZw1';
        await database.collection("matches").doc(authUid).collection("messages").onSnapshot((snapshot) => {
            const messages = {};
            snapshot.forEach(doc => {
                messages[doc.id] = doc.data();
            })
            this.setState({ messages });
            console.log("message:", messages);
        })
    }


    getIndex(value, arr) {
        const arrKeys = Object.keys(arr);
        const regex = RegExp(`${value}`);
        for(var i = 0; i < arrKeys.length; i++) {
            if(regex.test(arrKeys[i])) {
                return i;
            }
        }
        return -1;
    }

    getDetails() {
        const firstMessageIndex = this.getIndex('first-message', this.state.messages);
        const matchStartIndex = this.getIndex('match-start', this.state.messages);
        console.log("first message index:", firstMessageIndex);

        const firstMessage = arr[firstMessageIndex];
        const match = arr[matchStartIndex];
        console.log("First message:", firstMessage);
        console.log("Match:", match);

        this.setState({
            request: match,
            notes: firstMessage
        })
    }

    onInputChange = (e) => {
        const content = e.target.value;
        this.setState({ content });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        

        const arr = Object.values(this.state.messages); 
        console.log('messages:', arr);



        

        const requestDetails = Object.entries(this.state.request).map((x, i) => {
            const { data, event, source, timestamp } = x;
            return (
                <div key={i}>
                    <p> {event} </p>
                </div>
            )
        });


        const chatBody = arr.map((i, chat) => {
            return (
                <div>
                    <p key={`${i}-sender-id`}> {chat.sender_id} </p>
                    <p style={{marginBottom: '40px'}} key={i}> {chat.text} </p>
                </div>
            )
        });

        return (
            <div>
                <div className="chats">
                    <p className="timestamp"> {this.state.timestamp} </p>
                    <p className="message-request" onLoad={this.getDetails}>

                    </p>
                    {chatBody}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Send a message..." 
                        onChange={this.onInputChange} 
                        value={this.state.content}>
                    </input>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    authUid: state.auth.user.uid
});


export default connect(mapStateToProps)(Chats);
