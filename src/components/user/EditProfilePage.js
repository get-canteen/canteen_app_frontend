import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startEditUserDocument } from '../../actions/user';

class EditProfilePage extends React.Component {
    state = {
        display_name: '',
        title: '',
        about: ''
    }
    onNameChange = (e) => {
        const display_name = e.target.value;
        this.setState(() => ({ display_name }));
    }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    }
    onAboutChange = (e) => {
        const about = e.target.value;
        this.setState(() => ({ about }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log('onSubmit is called...')
        this.props.startEditUserDocument(this.state);
    }
    render() {
        return (
        <div>
            <h1> Edit Profile Page </h1>
            <form onSubmit={this.onSubmit}>
                <div>
                    <h3> Name </h3>
                    <input
                        type="text"
                        autoFocus
                        value={this.state.display_name}
                        onChange={this.onNameChange}
                    />
                </div>
                <div>
                    <h3> Title </h3>
                    <input
                        type="text"
                        autoFocus
                        value={this.state.title}
                        onChange={this.onTitleChange}
                    />
                </div>
                <div>
                    <h3> About </h3>
                    <textarea
                        type="text"
                        autoFocus
                        value={this.state.about}
                        onChange={this.onAboutChange}
                    />
                </div>
                <div>
                    <h3> Interests </h3>
                    <Link to="/profile/edit/interest"> 
                    {
                        this.props.user.interests.length ? 
                        <div>
                            {this.props.user.interests.map((interest, i) => (
                                <div key={i}> {interest} </div>
                            )) }
                        </div> : 'Add Interest'
                    }
                    </Link>
                </div>
                <div>
                    <h3> Offerings </h3>
                    <div>
                        {Object.values(this.props.user.teach_skill).map((skill, i) => (
                            <div key={i} type="teach">
                                <Link to={`/profile/edit/teach_skill/${i}`}>
                                    <p> {skill.name} </p>
                                    <p> {skill.description} </p>
                                    <p> ${skill.price} / {skill.duration} minutes </p>
                                </Link>
                            </div>
                        ))}
                        <Link to="/profile/edit/skill"> Add Offering </Link>
                    </div>
                </div>
                <div>
                    <h3> Asks </h3>
                    <div>
                        {Object.values(this.props.user.learn_skill).map((skill, i) => (
                            <div key={i} type="learn">
                                <Link to={`/profile/edit/learn_skill/${i}`}>
                                    <p> {skill.name} </p>
                                    <p> {skill.description} </p>
                                    <p> ${skill.price} / {skill.duration} minutes </p>
                                </Link>
                            </div>
                        ))}
                        <Link to="/profile/edit/skill"> Add Ask </Link>
                    </div>
                </div>
                <br></br>
                <button> Save </button>
            </form>
        </div>
        );
    };
};

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    startEditUserDocument: (updates) => dispatch(startEditUserDocument(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);