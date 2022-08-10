import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/chart.css";
import { ClockTask } from "./clocktask";

import { Context } from "../store/appContext";

export const Chart = () => {
	const { store, actions } = useContext(Context);
	const [inputValue, setInputValue] = useState("");
	// const [inputValuePerson, setInputValuePerson] = useState("");
	const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
	const [status, setStatus] = useState(0)
	const [interv, setInterv] = useState()
	var updateMs = time.ms, updateS = time.s, updateM = time.m, updateH = time.h;


	const start = () => {
		run();
		setStatus(1)
		setInterv(setInterval(run, 10));
	}
	const stop = () => {
		clearInterval(interv)
		setStatus(1);
	}

	const run = () => {
		if (updateM === 60) {
			updateH++;
			updateM = 0;
		}
		if (updateS === 60) {
			updateM++;
			updateS = 0;
		}
		if (updateMs === 100) {
			updateS++;
			updateMs = 0;
		}
		updateMs++
		return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH })
	}

	// const done = () => {
	// 	actions.changeTask("done", item.id)
	// }

	return (
		<div className="container">
			<div>
				<ClockTask time={time} />
				{(status === 0) ? <div> <button onClick={start}>start</button></div> : ""}
				{(status === 1) ? <button onClick={stop}>stop</button> : <button onClick={stop}>stop</button>}
			</div>
			<div>
				<div className="d-flex m-3 mt-5">
					<div className="d-flex">
						<h3 className="pe-3">Write todo here:</h3>
						<div>
							<input className="input-task"
								name="todo"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}></input>
						</div>
						{/* <h2 className="pe-3 ps-3">Mabe by:</h2> */}
						{/* <div className="mb-5">
							<input className="input-task"
								name="madeBy"
								value={inputValuePerson}
								onChange={(e) => setInputValuePerson(e.target.value)}></input>
						</div> */}

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
					<div>
						{store.tasks.map((item) => {
							if (item.answer_type == "inProgress") {
								return (
									<div className="d-flex p-2 box-todo">
										<p>{item.task}</p>
										<button className="btn-todo m-1" onClick={() => actions.changeTask("todo", item.id)} ><i class="fas fa-clipboard-list"></i></button>
										<button className="btn-done m-1" onClick={() => actions.changeTask("done", item.id)}><i class="far fa-check-circle"></i></button>
										<button onClick={() => actions.deleteTask(item.id)} className="btn-delete m-1"><i class="fas fa-trash-alt"></i></button>
										<div><ClockTask time={time} /></div>

									</div>)
							}
						})}

					</div>
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
