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
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", time: "" });
    const [allEvents, setAllEvents] = useState(store.newEvent);

    function handleAddEvent() {
        let newDate = new Date()
        let obj = { title: newEvent.title, start: newDate, end: newEvent.end, time: newEvent.time }
        setAllEvents([...allEvents, obj]);
    }
    console.log(newEvent.start, newEvent.end)

    return (

        <div className="m-4 mt-5">
            <h2>Add New Event</h2>
            <div className="d-grid">
                <input type="text" placeholder="Add Title" style={{ width: "20%" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="datepicker" />
                <DatePicker placeholderText="Start Date" style={{}} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} className="datepicker" />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} className="datepicker" />
            </div>
            {/* <TimePicker value={newEvent.time} onChange={(time) => setNewEvent({ ...newEvent, time })} /> */}
            <div>
                <button onClick={handleAddEvent} className="btn-calendar m-1">
                    Add Event
                </button>
                {/* <button className="btn-calendar m-1" onClick={() => actions.createCalendar(newEvent.title, newEvent.start, newEvent.end)}>
                    test
                </button> */}
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />

            <br />
            <br />
        </div>
    );
};
