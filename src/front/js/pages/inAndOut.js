import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/chart.css";

export const InAndOut = props => {
	var [date, setDate] = useState(new Date());
	const [staffMember, setStaffMember] = useState(null);
	const [staffHours, setStaffHours] = useState(null);
	const handleChange = e => {
		setStaffMember({ [e.target.name]: e.target.value });
	};

	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getStaffMembers();
		actions.getStaffHours();
	}, [])
	useEffect(() => {
		setStaffHours({ person_id: staffMember?.id, clock_in: true, start_time: new Date(), name: staffMember?.full_name });
	}, [staffMember])

	useEffect(() => {
		var timer = setInterval(() => setDate(new Date()), 1000)
		return function cleanup() {
			clearInterval(timer)
		}

	});

	useEffect(() => {
		actions.createStaffHours(staffHours?.person_id, staffHours?.clock_in, staffHours?.start_time, staffHours?.name)
	}, [staffHours])

	return (
		<div className="jumbotron">

			<div className="btn-group">
				<button type="button" className="btn btn-primary dropdown-toggle m-4" data-bs-toggle="dropdown" aria-expanded="false">
					Staff Members
				</button>
				<ul class="dropdown-menu">
					{store?.staff.map((item) => {
						return (<li onClick={() => {
							setStaffMember(item)
						}}>{item.full_name}</li>)
					})}
				</ul>
			</div>

			<div cl="m-4">
				<input className="input-in-out ms-4 m-2"
					name="full_name"
					value={staffMember?.full_name}
					onChange={handleChange} />
				<button className="btn btn-primary m-1" style={{ height: "55px" }} onClick={() => actions.createStaffMember(staffMember?.full_name)} >Send</button>
			</div>

			<div className="m-4">
				<p> Time : {date.toLocaleTimeString()}</p>
				<p> Date : {date.toLocaleDateString()}</p>
			</div>

			<div className="d-flex flex-wrap m-4">
				<div className="box-out m-2">
					<div>
						<h2 className="in">clock-out</h2>
						<h3></h3>
					</div>
				</div>
				<div className="box-in m-2">
					<div >
						<h2 className="out">clock-in</h2>
						{store.staffHours.map((person) => {
							return (
								<div className="box-clock d-flex">
									<div className="m-3">
										<p>{person.name}</p>
										<p>{person.start_time}</p>
									</div>
									<div>
										<button className="btn btn-danger m-3">Clock out</button>

									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>

		</div>
	);
};

InAndOut.propTypes = {
	match: PropTypes.object
};
