import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import { ClockTask } from "./clocktask";

import { Context } from "../store/appContext";

export const GetDishes = (data) => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState({ name: "", price: "", description: "" });

    const handleInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }


    return (
        <div className="container">
            <div className="ms-2">

                <h2>Add new dishe</h2>
                <input className="m-2" onChange={handleInput} name="name" value={inputValue.name} placeholder="name of the dish" />
                <input className="m-2" onChange={handleInput} name="price" value={inputValue.price} placeholder="price" />
                <input className="m-2" onChange={handleInput} name="description" value={inputValue.description} placeholder="description" />
                <button onClick={() => actions.createDishes(inputValue.name, inputValue.price, inputValue.description)} className="btn btn-success">add</button>
            </div>

            {store.dishes.map((item) => {
                return (
                    <div className="btn btn-primary m-2">
                        <p className="m-2">{item.name}</p>
                        <p className="m-2">{item.price}</p>
                        <p className="m-2">{item.description}</p>
                    </div>
                )
            })}

            <div>
                <h1>take order here</h1>
                <Link to="/ServerView"><button className="btn btn-success">Take Order</button></Link>
            </div>
        </div>
    );
};