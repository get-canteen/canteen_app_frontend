import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class MessagesPage extends React.Component {
   
    render() {
        return (
            <div>
                <h1> Messages Page </h1>
                <ul>
                  <li><h3><NavLink exact to='/chats'>Chats</NavLink></h3></li>
                  <li><h3><NavLink to='#'>Requests</NavLink></h3></li>
                </ul>
            </div>
        )
    }
}


export default MessagesPage;
