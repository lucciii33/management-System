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

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 8, 0),
        end: new Date(2022, 8, 0),
    },
    {
        title: "Vacation",
        start: new Date(2022, 8, 2),
        end: new Date(2022, 8, 4),
    },
    {
        title: "Conference",
        start: new Date(2022, 8, 8),
        end: new Date(2022, 8, 10),
    },
];

export const Calendary = () => {
    const { store, actions } = useContext(Context);
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    return (

        <div className="m-4 mt-5">
            <h2>Add New Event</h2>
            <div className="d-grid">
                <input type="text" placeholder="Add Title" style={{ width: "20%" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="datepicker" />
                <DatePicker placeholderText="Start Date" style={{}} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} className="datepicker" />
            </div>
            <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} className="datepicker" />
            <button onClick={handleAddEvent} className="btn-calendar">
                Add Event
            </button>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />

            <br />
            <br />
        </div>
    );
};
