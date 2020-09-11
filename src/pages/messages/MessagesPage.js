import React from 'react';
import { connect } from 'react-redux';
import { startFetchMessages } from '../../actions/matches';


class MessagesPage extends React.Component {
    state = {
        chats: [],
        content: ''
    }

    onInputChange = (e) => {
        const content = e.target.value;
        this.state.chats.push(content);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.startFetchMessages();
    }

    render() {
        return (
            <div>
                <h1> Messages Page </h1>
                <div className="chats">
                    <p className="timestamp"></p>
                    <p className="message-request">
                    </p>
                    {this.state.chats.map(chat => {
                        return <p key={chat.index}>{chat.content}</p>
                    })}
                </div>
                <form onSubmit={this.props.startFetchMessages}>
                    <input 
                        placeholder="Send a message..." 
                        onChange={this.onInputChange} 
                        value={this.state.content}>
                    </input>
                    {this.state.error ? <p>{this.state.error.message}</p> : null}
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    setMessages: state.auth.setMessages
});

const mapDispatchToProps = (dispatch) => ({
    startFetchMessages: () => dispatch(startFetchMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
