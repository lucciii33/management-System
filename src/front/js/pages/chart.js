import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";

import { Context } from "../store/appContext";

export const Chart = () => {
	const { store, actions } = useContext(Context);
	const [inputValue, setInputValue] = useState("");
	// const [status, SetStatus] = useState({ task: "", answer_type:""})
	// const handleChange = e => {
	// 	setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	// };

	return (
		<div className="container">
			<div>
				<div className="d-flex m-3 mt-5">
					<div className="d-flex">
						<h3 className="pe-5">Write todo here:</h3>
						<input className="input-task"
							name="todo"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}></input>
						<button onClick={() => actions.createTask(inputValue)} className="btn-send ms-3 ps-1">Send <i class="fas fa-paper-plane"></i>
						</button>
					</div>
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
						{store.tasks.map((item) => {
							if (item.answer_type == "todo") {
								return (
									<div className="d-flex p-2 box-todo">
										<p>{item.task}</p>
										<button className="btn-inProgress m-1" onClick={() => actions.changeTask("inProgress", item.id)} ><i class="fas fa-spinner"></i></button>
										<button className="btn-done m-1" onClick={() => actions.changeTask("done", item.id)}><i class="far fa-check-circle"></i></button>
										<button onClick={() => actions.deleteTask(item.id)} className="btn-delete m-1"><i class="fas fa-trash-alt"></i></button>
									</div>)
							}
						})}



					</div>
				</div>
				<div className="box-chart">
					<div className="text-center">
						<div className="title-bg-inProgress">
							<h2>InProgress</h2>
						</div>
					</div>
					{store.tasks.map((item) => {
						if (item.answer_type == "inProgress") {
							return (
								<div className="d-flex p-2 box-todo">
									<p>{item.task}</p>
									<button className="btn-todo m-1" onClick={() => actions.changeTask("todo", item.id)} ><i class="fas fa-clipboard-list"></i></button>
									<button className="btn-done m-1" onClick={() => actions.changeTask("done", item.id)}><i class="far fa-check-circle"></i></button>
									<button onClick={() => actions.deleteTask(item.id)} className="btn-delete m-1"><i class="fas fa-trash-alt"></i></button>
								</div>)
						}
					})}
				</div>
				<div className="box-chart">
					<div className="text-center">
						<div className="title-bg-done">
							<h2 >Done</h2>
						</div>
					</div>
					{store.tasks.map((item) => {
						if (item.answer_type == "done") {
							return (
								<div className="d-flex p-2 box-todo">
									<p>{item.task}</p>
									<button className="btn-inProgress m-1" onClick={() => actions.changeTask("inProgress", item.id)} ><i class="fas fa-spinner"></i></button>
									<button className="btn-todo m-1"><i class="fas fa-clipboard-list"></i></button>
									<button onClick={() => actions.deleteTask(item.id)} className="btn-delete m-1"><i class="fas fa-trash-alt"></i></button>
								</div>)
						}
					})}
				</div>
			</div>
		</div>
	);
};
