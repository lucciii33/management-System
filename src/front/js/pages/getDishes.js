import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import { ClockTask } from "./clocktask";

import { Context } from "../store/appContext";

export const GetDishes = (data) => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("");



    return (
        <div className="container">
            working
            {store.dishes.map((item) => {
                return (
                    <div className="btn btn-primary">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                )
            })}
        </div>
    );
};