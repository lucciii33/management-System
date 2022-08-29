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
            <div>

                <h2>Add new dishe</h2>
                <input />
                <button>add here</button>
            </div>




            {store.dishes.map((item) => {
                return (
                    <div className="btn btn-primary">
                        <p className="m-2">{item.name}</p>
                        <p className="m-2">{item.price}</p>
                    </div>
                )
            })}
        </div>
    );
};