import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startEditUserDocument, startDeleteLearnSkill, startDeleteTeachSkill } from '../../actions/user';
import { history } from '../../routers/AppRouter';
import EditPhotoModal from './EditPhotoModal';

class EditProfilePage extends React.Component {
    state = {
        display_name: this.props.user.display_name ? this.props.user.display_name : '',
        title: this.props.user.title ? this.props.user.title : '',
        about: this.props.user.about ? this.props.user.about : '',
        showModal: false
    }
    handleOpenModal = () => {
        console.log('open EditPhotoModal');
        this.setState({ showModal: true });
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
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
    onSubmit = async (e) => {
        e.preventDefault();
        const { display_name, title, about } = this.state;
        await startEditUserDocument({
            display_name,
            title,
            about
        });
        history.push("/profile");
    }
    onDeleteTeachSkill = (i) => {
        startDeleteTeachSkill(i);
    }
    onDeleteLearnSkill = (i) => {
        startDeleteLearnSkill(i);
    }
    render() {
        return (
        <div>
            <h1> Edit Profile Page </h1>
            <form onSubmit={this.onSubmit}>
                <div>
                    <img src={this.props.user.photo_url} alt="user-photo" width="80px" height="100px"/>
                    <button type="button" onClick={this.handleOpenModal}> + </button>
                </div>
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
                            <div key={i}>
                                <Link to={`/profile/edit/teach-skill/${i}`}>
                                    <p> {i+1}. {skill.name} </p>
                                    <p> {skill.description} </p>
                                    <p> ${skill.price} / {skill.duration} minutes </p>
                                </Link>
                                <button type="button" onClick={() => this.onDeleteTeachSkill(i)}> X </button>
                            </div>
                        ))}
                        <Link to="/profile/add/teach-skill"> <h3> Add Offering </h3> </Link>
                    </div>
                </div>
                <div>
                    <h3> Asks </h3>
                    <div>
                        {Object.values(this.props.user.learn_skill).map((skill, i) => (
                            <div key={i}>
                                <Link to={`/profile/edit/learn-skill/${i}`}>
                                    <p> {i+1}. {skill.name} </p>
                                    <p> {skill.description} </p>
                                    <p> ${skill.price} / {skill.duration} minutes </p>
                                </Link>
                                <button type="button" onClick={() => this.onDeleteLearnSkill(i)}> X </button>
                            </div>
                        ))}
                        <Link to="/profile/add/learn-skill"> <h3> Add Ask </h3> </Link>
                    </div>
                </div>
                <br></br>
                <button type="submit"> Save </button>
            </form>
            <EditPhotoModal
                showModal={this.state.showModal}
                handleCloseModal={this.handleCloseModal}
            />
        </div>
        );
    };
};

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(EditProfilePage);