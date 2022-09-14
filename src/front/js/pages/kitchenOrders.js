import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import { ClockTask } from "./clocktask";

import { Context } from "../store/appContext";

export const KitchenOrders = (data) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getOrders();

    }, [])

    return (
        <div className="container">
            <h3>Orders</h3>
            <div className="row">
                {store.order.map((item) => {
                    console.log(item)
                    console.log(item.items)
                    // console.log(item.items)
                    return (
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className={item.status = "pending" ? "box-pending" : "box-todo"}>

                                <h2 className="m-2">table number:{item.table_number}</h2>
                                <h6>start Order: {item.start_ticket_time}</h6>

                                {item.items.map((food) => {
                                    return (<h4>{food.name}</h4>)
                                })}
                                <p className="m-2">Important changes: {item.important_changes}</p>
                                <div className="d-flex ">
                                    <div className="inProgressOrder m-1"><i className="fas fa-spinner"></i></div>
                                    <div className="orderDone m-1"><i className="far fa-check-circle" /></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    );
};