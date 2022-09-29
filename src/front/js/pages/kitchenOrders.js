import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import { ClockTask } from "./clocktask";

import { Context } from "../store/appContext";

export const KitchenOrders = (data) => {
    const { store, actions } = useContext(Context);
    // const [status, setStatus] = useState({ status: "in progress" });

    useEffect(() => {
        actions.getOrders();

    }, [])

    return (
        <div className="container">
            <h3>Orders</h3>
            <div className="row">
                {store.order.map((item) => {
                    return (
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className={item.status === "Done" ? "box-done" : item.status === "inProgress" ? "box-InProgress" : item.status === "pending" ? "box-pending" : "box-pending"}>
                                <h2 className="m-2">table number:{item.table_number}</h2>
                                <h6>start Order: {item.start_ticket_time}</h6>
                                {item.items.map((food) => {
                                    return (<h4>{food.name}</h4>)
                                })}
                                <p className="m-2">Important changes: {item.important_changes}</p>\
                                <h4>total price of the ticket: {item.total_price}</h4>
                                <div className="d-flex ">
                                    <button className="inProgressOrder m-1" onClick={() => actions.editOrderStatus("inProgress", item.id)}><i className="fas fa-spinner"></i></button>
                                    <button className="orderDone m-1" onClick={() => actions.editOrderStatus("Done", item.id)}><i className="far fa-check-circle" /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    );
};