
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


import { Context } from "../store/appContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
labels: []
export const NewChart = (data) => {
    const { store, actions } = useContext(Context);

    const [info, setInfo] = useState({ month: "" });
    const handleChange = e => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };
    const [howMuch, setHowMuch] = useState({ income: "" });
    const handleChangeTwo = e => {
        setHowMuch({ ...howMuch, [e.target.name]: e.target.value });
    };

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    console.log(chartData);

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio"],
            datasets: [
                {
                    label: "monthly sell",
                    data: [100, 155, 134, 120, 720, 200, 400],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
                },
            ],
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "sell of the year",
                },
            },
        });
    }, [setChartData.labels]);
    return (

        <div className="col-12 col-md-6 col-lg-4">

            <label>monthy sell</label>
            <input value={info.month}
                name="month"
                onChange={handleChange}></input>
            <button onClick={() => {
                chartData.labels.push(info.month);
            }}>add month</button>

            <label>quantity</label>
            <input value={howMuch.income}
                name="income"
                onChange={handleChangeTwo}></input>
            <button onClick={() => {
                chartData.datasets.map((num) => {
                    num.data.push(parseFloat(howMuch.income))
                })
            }}>add month</button>
            <Bar options={chartOptions} data={chartData} />


        </div>
    );
};