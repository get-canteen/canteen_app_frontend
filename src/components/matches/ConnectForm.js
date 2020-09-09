import React from 'react';
import database from '../../../firebase/firebase';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';

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
        const { availability } = this.state.user;
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
        const { availability, time_zone } = this.state.user; 
        console.log("availability: ", availability); // availability contains the requested user's start and end time (in seconds) for each dow.
        console.log("time_zone: ", time_zone); // timezone is num of seconds the requested user's time zone is behind UTC time.
        const { duration } = this.state;
        const dow = moment(date._d).weekday();

        const now = new Date();
        const daySeconds = 24 * 60 * 60; // 86400
        const localOffset = now.getTimezoneOffset() * 60; // localOffset is num of seconds the current user device's time zone is behind UTC time.
        console.log("localOffset: ", localOffset);
        const startTime = availability[dow].start_time - time_zone + localOffset; // startTime according to user's current time zone
        const endTime = availability[dow].end_time - time_zone + localOffset; // endTime according to user's current timezone

        // if (startTime < 0 && endTime <= 0) {
        //     startTime = daySeconds + startTime;
        //     endTime = daySeconds + endTime;
        // } 
        // else if (startTime < 0 && endTime > 0) {
        //     startTime = daySeconds + startTime;
        // } 
        // else if (startTime < daySeconds && endTime > daySeconds) {
        //     endTime = endTime - daySeconds;
        // } 
        // else if (startTime >= daySeconds && endTime > daySeconds) {
        //     startTime = startTime - daySeconds;
        //     endTime = endTime - daySeconds;
        // } 
        // else if (startTime >= 0 &&
        //     startTime <= daySeconds &&
        //     endTime >= 0 &&
        //     endTime <= daySeconds) {
            
        // }

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
        const { photo_url, display_name, title, teach_skill, learn_skill } = { ...this.state.user };
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
                        this.state.availableTimes.map((i, time) => (
                            <div>
                                <button key={i}
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

ConnectForm.propTypes = {
    match: PropTypes.object.isRequired
};

export default ConnectForm;
