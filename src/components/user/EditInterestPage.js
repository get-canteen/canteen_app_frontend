import React from 'react';
import { connect } from 'react-redux';
import { startAddInterest, startDeleteInterest } from '../../actions/user';

class EditInterestPage extends React.Component {
    state = {
        interest: ''
    }
    onChange = (e) => {
        const interest = e.target.value;
        this.setState({ interest });
    }
    onClickAdd = () => {
        this.props.addInterest(this.state.interest);
    }
    onClickX = (interest) => {
        this.props.deleteInterest(interest);
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
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    interests: state.user.interests
})

const mapDispatchToProps = (dispatch) => ({
    addInterest: (interest) => dispatch(startAddInterest(interest)),
    deleteInterest: (interest) => dispatch(startDeleteInterest(interest))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditInterestPage);