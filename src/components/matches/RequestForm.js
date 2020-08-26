import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class RequestForm extends React.Component {
    state = {
        date: moment().startOf('month'),
        focused: false,
        availableTimes: [],
        time: null
    };
    onDateChange = (date) => {
        this.setState({ date });
        let availableTimes = this.generateAvailableTimes(date);
        this.setState({ availableTimes });
    }
    onFocusChange = ({ focused }) => {
        this.setState({ focused });
    }
    onTimeClick = (time) => {
        this.setState({ time });
        console.log(time);
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
        const { availability, time_zone } = this.props.location.state.user;
        const { duration } = this.props.location.state.skill;
        const dow = moment(date._d).weekday();

        const now = new Date();
        const localOffset = now.getTimezoneOffset() * 60;
        const startTime = availability[dow].start_time - time_zone + localOffset;
        const endTime = availability[dow].end_time - time_zone + localOffset;

        const availableTimes = [];
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
        const { user, skill } = this.props.location.state;
        const { photo_url, display_name, title } = user;
        const { name, description, price, duration } = skill;
        console.log("user: ", user);
        return (
            <div>
                <h1> Request Form Page </h1>
                <div>
                    <img src={photo_url || "/images/anonymous.png"} alt="profile photo" width="80px" height="100px"/>
                    <h3> {display_name} </h3> 
                    <h4> {title} </h4>
                    <p> {name} </p>
                    <p> {description} </p>
                    <p> ${price} / {duration} minutes </p>
                </div>
                <SingleDatePicker
                    date={this.state.date} 
                    onDateChange={this.onDateChange} 
                    focused={this.state.focused}
                    onFocusChange={this.onFocusChange} 
                    id={id} 
                    numberOfMonths={1}
                    isOutsideRange={this.isOutsideRange}
                    // keepOpenOnDateSelect={true}
                />
                <div>
                    <h3> Select a time </h3>
                    <h4> Duration: {duration} </h4>
                    {
                        this.state.availableTimes.map(time => (
                            <button style={{display: "block"}}
                                type="button"
                                onClick={() => this.onTimeClick(time)}
                            >
                                {time}
                            </button>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default RequestForm;
