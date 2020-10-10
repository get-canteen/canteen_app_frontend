import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import database from '../../../firebase/firebase';
import { CloudFunctionManager } from '../../functions/functions';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
  ));

class Chats extends React.Component {

    state = {
        messages: {},
        text: ''
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

    getTimeZone = (t) => {
        const time = Number(t);
        const date = new Date(time);
        const timeZone = moment.tz.guess();
        const timeZoneOffset = date.getTimezoneOffset();
        return moment.tz.zone(timeZone).abbr(timeZoneOffset);
    }

    sortMessages = (obj) => {
        Object.values(obj).forEach(element => {
            element.timestamp.seconds = moment(element.timestamp.seconds * 1000).format()
        });
        const sortedMessages = Object.values(obj).sort((a,b) => { 
            return moment(a.timestamp.seconds).diff(moment(b.timestamp.seconds)) 
        });
        return sortedMessages;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newTime = new Date();
        const seconds = newTime / 1000;
        const nanoseconds = newTime * 1000000;
        const userRef = database.collection("matches").doc('3uJrPEDpXLXN6R8dKmcWXgGPVzf2If9DejkPFdVo5Qf56HRmOlXcMZw1').collection("messages").add({
            data: null,
            sender_id: this.props.authUid,
            text: this.state.text,
            timestamp: {
                nanoseconds: nanoseconds,
                seconds: seconds
            },
            type: 0
        });  
        this.setState({
            text: ''
        });
        const form = document.getElementById('chat-form');
        form.reset();
    }

    render() {  
        let messages = this.state.messages;
        
        const firstMessageIndex = this.getIndex('first-message', messages);
        const matchStartIndex = this.getIndex('match-start', messages);
        const requestMessage = Object.values(messages)[firstMessageIndex];
        const request = Object.values(messages)[matchStartIndex];

        const sortedMessages = this.sortMessages(messages);
        console.log("sorted messages: ", sortedMessages);
    
        return (
            <div>
                <div className="chats">
                {   
                    request !== undefined ?
                        <div className="request-details" style={{marginBottom: '40px'}}>
                            <h3> { request.data.title } </h3>
                            <p><strong>Offering/Ask:</strong> { request.data.skill }</p>
                            <p><strong>Price:</strong> ${ request.data.price }</p>
                            <p><strong>Date:</strong> { moment.utc(request.data.time.seconds * 1000).format('dddd, MMMM D, YYYY') }</p>
                            <p><strong>Time:</strong> { [moment.utc(request.data.time.seconds * 1000).format('h:mm A'), ' ',  this.getTimeZone(request.data.time.seconds * 1000)] }</p>
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
                    Object.values(sortedMessages).map((chat, i) => {
                        return (
                            <div className="chat-item" key={i}>
                                <p> {chat.sender_id} </p>
                                <p style={{marginBottom: '40px'}}> {chat.text} </p>
                            </div>
                        )
                    })
                }
                </div>
                <form id="chat-form" onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Send a message..." 
                        onChange={(e) => {
                            const text = e.target.value;
                            this.setState({ text });
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
