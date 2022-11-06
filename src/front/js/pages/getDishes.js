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
            <div className="ms-2 mt-5">


                <h2 className="text-center mt-5 pb-4">Add new dishe</h2>
                <div className="box-rest-bg">
                    <div className="d-grid center-input">
                        <input className="m-2 mt-4 input-rest" onChange={handleInput} name="name" value={inputValue.name} placeholder="name of the dish" />
                        <input className="m-2 mt-4 input-rest" onChange={handleInput} name="price" value={inputValue.price} placeholder="price" />
                        <input className="m-2 mt-4 input-rest-textarea" onChange={handleInput} name="description" value={inputValue.description} placeholder="description" />
                    </div>
                    <div className="d-flex center-input">
                        <button onClick={() => actions.createDishes(inputValue.name, inputValue.price, inputValue.description)} className="btn btn-success">ADD DISH</button>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap mt-5"> {store.dishes.map((item) => {
                return (
                    <div className="m-1 mt-2">
                        <div className="dish-desc">
                            <div className="p-2">
                                <div>
                                    <p className="m-0"><strong>Dish Name:</strong></p>
                                    <p className="m-1">{item.name}</p>
                                </div>
                                <di>
                                    <p className="m-0"><strong>Price:</strong></p>
                                    <p className="m-1">{item.price}$</p>
                                </di>
                                <div>
                                    <p className="m-0"><strong>Ingridients:</strong></p>
                                    <p className="m-1">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>

            <div className="ms-2 mt-5">
                <h2 className="text-center mt-5 pb-4">Add new Drink</h2>
                <div className="box-rest-bg">
                    <div className="d-grid center-input">
                        <input className="m-2 mt-4 input-rest" onChange={handleInput} name="name" value={inputValue.name} placeholder="name of the drink" />
                        <input className="m-2 mt-4 input-rest" onChange={handleInput} name="price" value={inputValue.price} placeholder="price" />
                        <input className="m-2 mt-4 input-rest-textarea" onChange={handleInput} name="description" value={inputValue.description} placeholder="description" />
                    </div>
                    <div className="d-flex center-input">
                        <button onClick={() => actions.createDishes(inputValue.name, inputValue.price, inputValue.description)} className="btn btn-success">ADD DISH</button>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-center mt-5">take order here</h1>
                <Link to="/ServerView"><button className="btn btn-success">Take Order</button></Link>
            </div>
        </div>
    );
};