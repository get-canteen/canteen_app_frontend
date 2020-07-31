import React from 'react';
import { connect } from 'react-redux';

class EditSkillPage extends React.Component {
    state = {
        name: '',
        description: '',
        duration: 30,
        price: 0
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({ name });
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState({ description });
    }
    onDurationChange = (e) => {
        const duration = e.target.value;
        this.setState({ duration });
    }
    onPriceChange = (e) => {
        const price = e.target.value;
        this.setState({ price });
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1> Edit Skill Page </h1>
                <div>
                    <h3> Skill Name </h3>
                    <input
                        type="text"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
                </div>
                <div>
                    <h3> Price </h3>
                    <input
                        type="number"
                        min="0"
                        autoFocus
                        value={this.state.price}
                        onChange={this.onPriceChange}
                    />
                </div>
                <div>
                    <h3> Duration </h3>
                    <select
                        value={this.state.duration}
                        onChange={this.onDurationChange}
                    >
                        <option value="30"> 30 minutes </option>
                        <option value="60"> 60 minutes </option>
                        <option value="90"> 90 minutes </option>
                        <option value="120"> 120 minutes </option>
                    </select>
                </div>
                <div>
                    <h3> Description </h3>
                    <textarea
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                </div>
                <button> Save </button>
            </form>
        );
    };
};

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(EditSkillPage);