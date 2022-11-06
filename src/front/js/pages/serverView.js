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
            <div className="bg-services">
                <div className="m-3">
                    <label className="me-2">Table Number</label>
                    <input onChange={handleInput} name="table_number" value={inputValue.table_number} className="input-rest"></input>
                </div>

                <div className="m-3">
                    <label className="me-2">Changes</label>
                    <input onChange={handleInput} name="important_changes" value={inputValue.important_changes} className="input-rest"></input>
                </div>
            </div>

            <div className="row">
                {store.dishes.map((item) => {
                    return (
                        <div className="col-12 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="btn btn-primary" onClick={() => handleOrder(item)}>
                                    <p className="m-2">{item.name}</p>
                                    <p className="m-2">{item.price}</p>
                                    {/* <p className="m-2">{item.description}</p> */}
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
            <button className="btn btn-success m-2" onClick={() => actions.createOrder(inputValue)}>send To kitchen</button>

            <div>
                <Link to="/kitchenOrders"> <button className="btn btn-success m-2">see kithcen progress</button></Link>
            </div>

        </div>
    );
};