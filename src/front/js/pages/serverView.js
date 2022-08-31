import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import { ClockTask } from "./clocktask";

import { Context } from "../store/appContext";

export const ServerView = (data) => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState({ items: [], table_number: "", important_changes: "" });
    const [count, setCount] = useState({});

    const handleInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }
    const handleOrder = (dish) => {
        setInputValue({ ...inputValue, items: [...inputValue.items, dish] });
    }

    // useEffect(() => {
    //     for (let item of inputValue.items) {
    //         console.log(item)
    //         let key = item.name
    //         console.log(key)
    //         // for (key in count) {
    //         if (key === item.name) {
    //             setCount({ ...count, key: count[item.name] + 1 })
    //         } else {
    //             setCount({ ...count, key: 1 })
    //         }
    //         // }
    //     }

    // }, [inputValue.items])

    console.log(count)
    console.log(inputValue)


    return (
        <div className="container">
            <label>Table Number</label>
            <input onChange={handleInput} name="table_number" value={inputValue.table_number}></input>
            <label>changes</label>
            <input onChange={handleInput} name="important_changes" value={inputValue.important_changes}></input>
            <div className="row">
                {store.dishes.map((item) => {
                    return (
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="card">
                                <div className="btn btn-primary" onClick={() => handleOrder(item)}>
                                    <p className="m-2">{item.name}</p>
                                    <p className="m-2">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div>
                <ul> {inputValue.items.map((item) => {
                    return (<li>
                        {item.name}
                    </li>)
                })}
                </ul>
            </div>
            <button onClick={() => actions.createOrder(inputValue)}>send back end</button>
        </div>
    );
};