import React from 'react';
import database from '../../../firebase/firebase';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class ConnectForm extends React.Component {
    state = {
        user: null,
        skill: null,
        duration: 0,
        date: moment().startOf('month'),
        time: null,
        message: '',
        focused: false,
        availableTimes: []
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const snapshot = await database.collection("users").doc(id).get();
            this.setState({
                user: snapshot.data()
            })
        } catch (e) {
            console.error("Error fetching user", e);
        }
    }
    onDateChange = (date) => {
        this.setState({ 
            date, 
            availableTimes: this.generateAvailableTimes(date)
        });
    }
    isOutsideRange = (day) => {
        const today = moment();
        const { availability } = this.props.location.state.user;
        if (availability) {
            const availableDOWs = Object.keys(availability);
            return !availableDOWs.some(dow => {
                return moment(day).day() === parseInt(dow) 
                    && moment(day).isAfter(today)
            });
        } 
        return true;
    }
    generateAvailableTimes = (date) => {
        console.log("date", date);
        const { availability, time_zone } = this.state.user;
        console.log("availability", availability);
        console.log("time_zone", time_zone);
        const { duration } = this.state;
        const dow = moment(date._d).weekday();

        const now = new Date();
        const localOffset = now.getTimezoneOffset() * 60;
        const startTime = availability[[dow]].start_time - time_zone + localOffset;
        const endTime = availability[[dow]].end_time - time_zone + localOffset;

        let availableTimes = [];
        let current = startTime;
        while (current <= endTime) {
            let hours; 
            let minutes;
            let suffix;
            if (current >= 86400) { // >24 hrs
                hours = Math.floor((current - 86400) / 3600); // convert to 0 - 23 hrs
                minutes = Math.floor(((current - 86400) % 3600) / 60);
            } else {
                hours = Math.floor((current / 3600)); // already 0 to 23 hrs
                minutes = Math.floor(((current) % 3600) / 60);
            }
            suffix = (hours >= 12) ? "PM" : "AM";
            hours = (hours > 12) ? hours - 12 : hours; // convert to 1 - 12 hrs
            hours = (hours === 0) ? 12 : hours; // if 0 then it is 12 AM 
            const time = hours + ":" + ((minutes < 10) ? "0" + minutes : minutes) + " " + suffix; 
            availableTimes.push(time);
            current += (duration * 60);
        }
        console.log("availableTimeslots: ", availableTimes);
        return availableTimes;
    }

    render() {
        const { id } = this.props.match.params;
        const { photo_url, display_name, title, teach_skill, learn_skill } = {...this.state.user};
        console.log("this.state.user", this.state.user);
        return (
            <div>
                <h1> Connect Form Page </h1>
                <div>
                    <img src={photo_url || "/images/anonymous.png"} alt="profile photo" width="80px" height="100px"/>
                    <h3> {display_name} </h3> 
                    <h4> {title} </h4>
                </div>
                <form>
                    <h2> Select a skill: </h2>
                    <h3> Offerings </h3>
                    { teach_skill && Object.entries(teach_skill).map(([index, skill]) => (
                        <div>
                            <button key={index} 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    const { duration } = skill;
                                    this.setState({ skill, duration });
                                }}
                            > 
                                {skill.name}
                            </button>
                        </div>
                    ))}
                    <h3> Asks </h3>
                    { learn_skill && Object.entries(learn_skill).map(([index, skill]) => (
                        <div>
                            <button key={index} 
                                onClick={(e) => { 
                                    e.preventDefault();
                                    const { duration } = skill;
                                    this.setState({ skill, duration });
                                }}
                            > 
                                {skill.name}
                            </button>
                        </div>
                    ))}
                </form>
                <h2> Select an available date: </h2>
                <SingleDatePicker
                    date={this.state.date} 
                    onDateChange={this.onDateChange} 
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })} 
                    id={id} 
                    numberOfMonths={1}
                    isOutsideRange={this.isOutsideRange}
                />
                <div>
                    <h2> Select an available time: </h2>
                    <h4> Duration: {this.state.duration} </h4>
                    {
                        this.state.availableTimes.map(time => (
                            <div>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ time });
                                    }}
                                >
                                    {time}
                                </button>
                            </div>
                        ))
                    }
                </div>
                <div> 
                    <h2> Add a message: </h2>
                    <textarea
                        placeholder="Add a message"
                        value={this.state.message}
                        onChange={(e) => {
                            const { message } = e.target.value;
                            this.setState({ message });
                        }}
                    > 
                    </textarea>
                </div>
                <button> Submit </button>
            </div>
        )
    }
}

export default ConnectForm;
