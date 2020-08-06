import React from 'react';
import { connect } from 'react-redux';
import { startAddInterest, startDeleteInterest } from '../../actions/user';
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
        startAddInterest(this.state.interest);
    }
    onClickX = (interest) => {
        startDeleteInterest(interest);
    }
    onClickDone = () => {
        history.push("/profile/edit");
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
                <button onClick={this.onClickDone}> Done </button>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    interests: state.user.interests
})

export default connect(mapStateToProps)(EditInterestPage);