import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import database from '../../../firebase/firebase';
import { CloudFunctionManager } from '../../functions/functions';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../../reducers/matches';
import MessagesPage from './MessagesPage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware())
);

class Chats extends React.Component {

    state = {
        messages: {},
        chats: {},
        content: ''
    }

  
    componentDidMount() {
        //this.props.authUid
        database.collection("matches").doc('3uJrPEDpXLXN6R8dKmcWXgGPVzf2If9DejkPFdVo5Qf56HRmOlXcMZw1').collection("messages").onSnapshot((snapshot) => {
            const messages = {};
            snapshot.forEach(doc => {
                messages[doc.id] = doc.data();
            })
            this.setState({ messages });
            console.log("message: ", messages);
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


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {  
        const messages = this.state.messages;
        const firstMessageIndex = this.getIndex('first-message', messages);
        const matchStartIndex = this.getIndex('match-start', messages);
        console.log(matchStartIndex);
        const requestMessage = Object.values(messages)[firstMessageIndex];
        const request = Object.values(messages)[matchStartIndex];
        console.log(request);
        console.log(requestMessage);
    
        return (
            <div>
                <div className="chats">
                { 
                    request !== undefined ?
                        <div className="request-details" style={{marginBottom: '40px'}}>
                            <h3> { request.data.title } </h3>
                            <p><strong>Offering/Ask:</strong> { request.data.skill }</p>
                            <p><strong>Price:</strong> ${ request.data.price }</p>
                            <p><strong>Date:</strong> { request.data.timestamp }</p>
                            <p><strong>Time:</strong> { request.data.timestamp }</p>
                        </div>

                    : null
                }
                {
                    requestMessage !== undefined ? 
                        <div className="request-message" style={{marginBottom: '40px'}}>
                            <p><em>{ requestMessage.data.sender }</em></p>
                        </div> 
                    : null
                }
                { 
                    Object.values(messages).map((chat, i) => {
                        return (
                            <div className="chat-item" key={i}>
                                <p> {chat.sender_id} </p>
                                <p style={{marginBottom: '40px'}}> {chat.text} </p>
                            </div>
                        )
                    }) 
                }
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Send a message..." 
                        onChange={(e) => {
                            const content = e.target.value;
                            this.setState({ content });
                        }}
                    >
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
