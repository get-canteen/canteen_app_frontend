import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { firebase } from '../../../firebase/firebase';
import styled from 'styled-components';
import { startUpdateProfilePhoto } from '../../actions/user';

const StyledInput = styled.input`
    display: none;
`;

const StyledLabel = styled.label`
    border: 1px solid #ccc;
    display: inline-block;
    padding: 3px 5px;
    cursor: pointer;
`;

const StyledModal = styled(Modal)``;

class EditPhotoModal extends React.Component {
    state = {
        image: null,
        url: "" 
    };
    onChangeFile = (e) => {
        console.log("onChangeFile is called");
        const image = e.target.files[0];
        console.log("image: ", image);
        this.setState({ image })
    }
    onClickUpload = () => {
        console.log("onClickUpload is called");
        const { image } = this.state;
        const uid = firebase.auth().currentUser.uid;
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`profile_image/${uid}/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => { 
            // progress function...
        }, 
        (e) => {
            // handle unsuccessful uploads...
            console.log(e);
        }, 
        () => {
            // handle successful uploads on complete...
            firebase.storage()
                .ref('profile_image')
                .child(`${uid}/${image.name}`)
                .getDownloadURL()
                .then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    startUpdateProfilePhoto(downloadURL);
                })
                .catch((e) => {
                    console.log("Error in profile photo upload: ", e);
                })
        })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Edit Photo Modal"
                portalClassName={"ReactModalPortal"}
                overlayClassName={"ReactModal__Overlay"}
                bodyOpenClassName={"ReactModal__Body--open"}
                shouldFocusAfterRender={true}
                ariaHideApp={false}
                style={{
                    overlay: {},
                    content: {}
                }}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <button onClick={this.props.handleCloseModal}> X </button>
                <h1> Edit Photo Modal </h1>
                <img src={this.props.user.photo_url} alt="uploaded profile pic" height="100" width="80"/>
                <br/>
                <StyledLabel>
                    <StyledInput type="file" onChange={this.onChangeFile}/>
                        Upload photo
                </StyledLabel>
                <br/>
                <button onClick={this.onClickUpload}> Apply </button>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(EditPhotoModal);
