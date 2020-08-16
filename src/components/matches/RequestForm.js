import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

class RequestForm extends React.Component {
    state = {
        date: moment().startOf('month'),
        focused: false
    };
    onDateChange = (date) => {
        this.setState({ date });
    }
    onFocusChange = ({ focused }) => {
        this.setState({ focused });
    }
    isDayBlocked = (day) => {
        const { availability } = this.props.location.user;
        if (availability) {
            const availableDOWs = Object.keys(availability);
            return !availableDOWs.some(dow => {
                return moment(day).day() === parseInt(dow)
            });
        } 
        return true;
    }

    // input is the dow property object within availability object of selected day
    // change endtime and starttime in (seconds) to the hour timestamp
    // create an array of all duration intervals between the two time stamps  
    // generateTimeSlots = (dow, duration) => {
    //     const { availability } = this.props.location.user;
    //     const endTime = moment.duration(availability[dow].end_time, 'seconds');
    //     const startTime = moment.duration(availability[dow].start_time, 'seconds');
    //     const formattedEnd = endTime.format("hh:mm");
    //     const formattedStart = startTime.format("hh:mm");
    //     const result = [];
    //     const current = moment(startTime);
    //     while (current <= endTime) {
    //         result.push(current.format("hh:mm"))
    //         current.add(duration, 'minutes');
    //         console.log(current);
    //     }
    //     console.log("RESULT: ", result);
    //     return result;
    // }
    render() {
        const { id } = this.props.match.params;
        const { user, skill } = this.props.location;
        const { photo_url, display_name, title, availability } = user;
        const { name, description, price, duration } = skill;
        console.log("user: ", user);
        // this.generateTimeSlots(2, 30);
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
                    isDayBlocked={this.isDayBlocked}
                    // openDirection={OPEN_UP}
                    keepOpenOnDateSelect={true}
                />
                <form>
                    <h3> Select a time </h3>
                    <h4> Duration: {duration} </h4>

                </form>

            </div>
        )
    }
}

export default RequestForm;
