import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";

import { Context } from "../store/appContext";

export const Chart = () => {
	const { store, actions } = useContext(Context);
	const [inputValue, setInputValue] = useState({ todo: "" });
	const handleChange = e => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};

	return (
		<div className="container">
			<div>
				<div className="d-flex m-3 mt-5">
					<h3 className="pe-5">Write todo here:</h3>
					<input className="input-task"
						name="todo"
						value={inputValue.todo}
						onChange={handleChange}></input>
				</div>
			</div>
			<div className="d-flex flex-wrap">
				<div className="box-chart">
					<div className="text-center">
						<div className="title-bg-todo">
							<h2 >ToDo</h2>
						</div>
					</div>

					<div className="">
						<div className="d-flex p-2 box-todo">
							<p>here is mi task and it need to see larger to see is it feet in the pc</p>
							<button className="btn-inProgress m-1" ><i class="fas fa-spinner"></i></button>
							<button className="btn-done m-1"><i class="far fa-check-circle"></i></button>
						</div>
						<div className="d-flex p-2 box-todo">
							<p>here is mi task and it need to see larger to see is it feet in the pc</p>
							<button className="btn-inProgress m-1" ><i class="fas fa-spinner"></i></button>
							<button className="btn-done m-1"><i class="far fa-check-circle"></i></button>
						</div>



					</div>
				</div>
				<div className="box-chart">
					<div className="text-center">
						<div className="title-bg-inProgress">
							<h2>InProgress</h2>
						</div>
					</div>
				</div>
				<div className="box-chart">
					<div className="text-center">
						<div className="title-bg-done">
							<h2 >Done</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
