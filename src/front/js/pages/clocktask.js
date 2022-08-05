import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Calendar from 'react-calendar'
import "../../styles/home.css";
import 'react-calendar/dist/Calendar.css';

export const ClockTask = (props) => {
    const { store, actions } = useContext(Context);



    return (
        <div className="m-4 mt-5">
            <span>{(props.time.h >= 10) ? props.time.h : "0" + props.time.h}</span>&nbsp;:&nbsp;
            <span>{(props.time.m >= 10) ? props.time.m : "0" + props.time.m}</span>&nbsp;:&nbsp;
            <span>{(props.time.s >= 10) ? props.time.s : "0" + props.time.s}</span>&nbsp;:&nbsp;
            <span>{(props.time.ms >= 10) ? props.time.ms : "0" + props.time.ms}</span>&nbsp;
        </div>
    );
};
