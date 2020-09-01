import React from 'react';
import { connect } from 'react-redux';
import { addInterest, deleteInterest } from '../../actions/user';
import { history } from '../../routers/AppRouter';

class EditInterestPage extends React.Component {
    state = {
        interest: ''
    };
    onChange = (e) => {
        const interest = e.target.value;
        this.setState({ interest });
    }
    onClickAdd = (e) => {
        e.preventDefault();
        addInterest(this.state.interest);
    }
    onClickX = (interest) => {
        deleteInterest(interest);
    }
    onClickDone = () => {
        history.push(`/${this.props.authUid}/edit`);
    }
    render() {
        return (
            <div>
                <h1> Edit Interest Page </h1>
                <input
                    type="text"
                    autoFocus
                    value={this.state.interest}
                    onChange={this.onChange}
                />
                <button onClick={this.onClickAdd}> Save </button>
                <div>
                    {this.props.interests.map((interest, i) => (
                        <div key={i}>
                            <p> #{interest} </p>
                            <button onClick={() => this.onClickX(interest)}> X </button>
                        </div>
                    )) }
                </div>
                <br/>
                <button onClick={this.onClickDone}> Done </button>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    authUid: state.auth.user.uid,
    interests: state.user.interests
})

export default connect(mapStateToProps)(EditInterestPage);