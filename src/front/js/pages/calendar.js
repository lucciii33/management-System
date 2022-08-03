import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Calendar from 'react-calendar'
import "../../styles/home.css";
import 'react-calendar/dist/Calendar.css';

export const Calendary = () => {
    const { store, actions } = useContext(Context);
    const [calDate, setCalDate] = useState(new Date())
    const [newDay, setNewDay] = useState([calDate]);

    function onChange(calDate) {
        console.log(calDate)
        setCalDate(calDate)
    }
    console.log(newDay)
    // function arrayToString(calDate) {
    //     let arrayToStr = newDay.toString()
    //     return arrayToStr
    // }

    return (
        <div className="text-center mt-5">
            <Calendar className="cal" onChange={onChange} value={calDate} />
            {/* <p>here is the day `${arrayToStr}`</p> */}
        </div>
    );
};
