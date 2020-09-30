import React from 'react';
import database from '../../../firebase/firebase';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import { CloudFunctionManager } from '../../functions/functions';

class PublicConnectForm extends React.Component {
    state = {
        user: null,
        skill: null,
        date: moment().startOf('month'),
        time: null,
        message: '',
        focused: false,
        availableTimes: [],
        timeRanges: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const snapshot = await database.collection("users").doc(id).get();
            this.setState({
                user: snapshot.data()
            })
            const { availability, time_zone } = snapshot.data(); 
            console.log("availability:", availability)
            const daySeconds = 24 * 60 * 60;
            const localOffset = new Date().getTimezoneOffset() * 60;
            availability && Object.entries(availability).map(([dow, times]) => {
                console.log("typeof dow in availability", typeof dow);
                dow = parseInt(dow);
                const startTime = times.start_time - time_zone - localOffset;
                const endTime = times.end_time - time_zone - localOffset;
        
                console.log('startTime', startTime);
                console.log('endTime', endTime);
        
                if(startTime < 0 && endTime <= 0) {
                    startTime += daySeconds;
                    endTime += daySeconds;
                    this.addToTimeRange(startTime,endTime,dow,-1);
                } else if(startTime < 0 && endTime > 0)  {
                    startTime += daySeconds;
                    this.addToTimeRange(startTime,daySeconds,dow,-1);
                    this.addToTimeRange(0, endTime, dow, 0);
                } else if(startTime < daySeconds && endTime > daySeconds) {
                    endTime -= daySeconds;
                    this.addToTimeRange(startTime, daySeconds,dow,0);
                    this.addToTimeRange(0, endTime, dow, 1)
                } else if(startTime >= daySeconds && endTime > daySeconds){
                    startTime -= daySeconds;
                    endTime -= daySeconds;
                    this.addToTimeRange(startTime, endTime, dow, 1);
                } else if(startTime >= 0 && startTime < daySeconds 
                    && endTime > 0 && endTime <= daySeconds) {
                        this.addToTimeRange(startTime,endTime,dow, 0);
                } else {
                    console.log('error converting availability');
                }
            })
        } catch (e) {
            console.error("Error fetching user or calculating time range", e);
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

    addToTimeRange = (startTime, endTime, dayIndex, dayOffset) => {
        if(dayIndex === null) {
            console.log('Error during availbility parsing. Failed to parse day.');
            return;
        }
        let newDayIndex = parseInt(dayIndex) + dayOffset;
        let finalDayIndex;

        if(newDayIndex < 0) {
            finalDayIndex = 6;
        } else if(newDayIndex > 6){
            finalDayIndex = 0;
        } else {
            finalDayIndex = newDayIndex;
        }

        this.setState(prevState => {
            return {
                timeRanges: {
                    ...prevState.timeRanges,
                    [finalDayIndex]: [startTime, endTime]
                }
            }
        })

        console.log('timeRanges', this.state.timeRanges);
    }
    generateAvailableTimes = (date) => {
        const dow = moment(date._d).weekday();
        console.log("typeof dow from moment weekday conversion", typeof dow);
        const startTime = this.state.timeRanges[dow][0];
        const endTime = this.state.timeRanges[dow][1];

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
            if(this.state.skill) {
                current += (this.state.skill.duration * 60);
            }
        }
        console.log("availableTimeslots: ", availableTimes);
        return availableTimes;
    }
    addRequest = () => {
        console.log("addRequest is called");
        console.log(this.state);
        const data = {
            receiver_id: this.props.match.params.id,
            referral_id: null,
            comment: this.state.message,
            referral_comment: "",
            type: this.state.skill.type,
            index: parseInt(this.state.skill.index),
            time: moment(this.state.date + " " + this.state.time, 'DD/MM/YYYY HH:mm').valueOf(),
        }
        console.log("data passed to addRequest:", data);
        try {
            CloudFunctionManager.addRequest(data);
        } catch (e) {
            console.log("Error calling addRequest", e);
        }
    }

    render() {
        const { id } = this.props.match.params;
        const { photo_url, display_name, title, teach_skill, learn_skill } = {...this.state.user};
        console.log("this.state", this.state);
        return (
            <div>
                <h1> Public Connect Form Page </h1>
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
                                    this.setState({ skill });
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
                                    this.setState({ skill });
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
                    <h4> Duration: {this.state.skill ? this.state.skill.duration + " minutes" : "please select a skill"} </h4>
                    {
                        this.state.availableTimes.map((time, i) => (
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

PublicConnectForm.propTypes = {
    match: PropTypes.object.isRequired
};

export default PublicConnectForm;
