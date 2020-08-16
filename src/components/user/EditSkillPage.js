import React from 'react';
import { connect } from 'react-redux';
import { updateTeachSkill, updateLearnSkill } from '../../actions/user';
import { history } from '../../routers/AppRouter';

class EditSkillPage extends React.Component {
    state = {
        name: this.props.match.params.type === "teach-skill" 
            ? this.props.teach_skill[this.props.match.params.index]["name"] 
            : this.props.learn_skill[this.props.match.params.index]["name"],
        description: this.props.match.params.type === "teach-skill"
            ? this.props.teach_skill[this.props.match.params.index]["description"] 
            : this.props.learn_skill[this.props.match.params.index]["description"],
        duration: this.props.match.params.type === "teach-skill"
            ? this.props.teach_skill[this.props.match.params.index]["duration"] 
            : this.props.learn_skill[this.props.match.params.index]["duration"],
        price: this.props.match.params.type === "teach-skill"
            ? this.props.teach_skill[this.props.match.params.index]["price"] 
            : this.props.learn_skill[this.props.match.params.index]["price"],
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
    onSubmit = async (e) => {
        e.preventDefault();
        const { type, index } = this.props.match.params;
        if (type === 'teach-skill') {
            await updateTeachSkill(this.state, index);
        } 
        else if (type === 'learn-skill') {
            await updateLearnSkill(this.state, index);
        }
        history.push(`/profile/${this.props.authUid}/edit`);
    }
    render() {
        const { type } = this.props.match.params;
        const type_name = type === "teach-skill" ? "Offering" : "Ask";
        return (
            <form onSubmit={this.onSubmit}>
                <h1> Edit {type_name} Skill Page </h1>
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
    authUid: state.auth.user.uid,
    teach_skill: state.user.teach_skill,
    learn_skill: state.user.learn_skill
})

export default connect(mapStateToProps)(EditSkillPage);