import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import enUS from 'date-fns/locale/en-US'


const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



export const Calendary = () => {
    const { store, actions } = useContext(Context);
    const [newEvent, setNewEvent] = useState({ title: "", start: "", time: "", quantity: "", name: "", hour: "" });
    // const [allEvents, setAllEvents] = useState(store.newEvent);

    // function handleAddEvent() {
    //     let newDate = new Date()
    //     let obj = { title: newEvent.title, start: newDate, end: newEvent.end, time: newEvent.time }
    //     setAllEvents([...allEvents, obj]);
    // }
    // console.log(newEvent.start, newEvent.end)

    useEffect(() => {
        actions.getBookings()
    }, [])

    return (

        <div className="m-4 mt-5">
            <h2>Add New Event</h2>
            <div className="d-grid">
                <input type="text" placeholder="Add Title" style={{ width: "20%" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="datepicker" />
                <DatePicker placeholderText="Start Date" style={{}} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} className="datepicker" />
                {/* <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} className="datepicker" /> */}
                <label>how many persons?</label>
                <input value={newEvent.quantity} onChange={(e) => setNewEvent({ ...newEvent, quantity: e.target.value })} />

                <label>name of the reservation person</label>
                <input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />

                <h1>pick hours here</h1>
                <div className="d-block">
                    <label>2pm</label>
                    <input type="radio" value={"2"}
                        checked={newEvent.hour === '2'}
                        onChange={(e) => setNewEvent({ ...newEvent, hour: e.target.value })}></input>
                </div>
                <div className="d-block">
                    <label>3pm</label>
                    <input type="radio" value={"3"}
                        checked={newEvent.hour === '3'}
                        onChange={(e) => setNewEvent({ ...newEvent, hour: e.target.value })}></input>
                </div>
                <div className="d-block">
                    <label>4pm</label>
                    <input type="radio" value={"4"}
                        checked={newEvent.hour === '4'}
                        onChange={(e) => setNewEvent({ ...newEvent, hour: e.target.value })}></input>
                </div>

            </div>
            {/* <TimePicker value={newEvent.time} onChange={(time) => setNewEvent({ ...newEvent, time })} /> */}
            <div>
                {/* <button onClick={handleAddEvent} className="btn-calendar m-1">
                    Add Event
                </button> */}
                <button className="btn-calendar m-1" onClick={() => actions.createCalendar(newEvent.title, newEvent.start, newEvent.quantity, newEvent.name, newEvent.hour)}>
                    test
                </button>
            </div>
            {/* <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} /> */}

            <br />
            <br />
            <div>
                {store?.newEvent.map((item) => {
                    return (
                        <div>
                            <h1>{item.name}</h1>
                            <h6>{item.quantity}</h6>
                            <h6>{item.start_time.slice(0, 17)} at: {item.hour}</h6>
                            <p>{item.description}</p>
                        </div>
                    )

                })}
            </div>
        </div>
    );
};
