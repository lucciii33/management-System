import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const InAndOut = props => {
	var [date, setDate] = useState(new Date());
	const [staffMember, setStaffMember] = useState(null);
	const [staffHours, setStaffHours] = useState(null);
	const handleChange = e => {
		setStaffMember({ ...staffMember, [e.target.name]: e.target.value });
	};

	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getStaffMembers();
	}, [])
	useEffect(() => {
		setStaffHours({ person: staffMember, clock_in: false, start_time: new Date(), end_time: new Date() });
	}, [staffMember])

	useEffect(() => {
		var timer = setInterval(() => setDate(new Date()), 1000)
		return function cleanup() {
			clearInterval(timer)
		}

	});

	return (
		<div className="jumbotron">

			<div className="btn-group">
				<button type="button" className="btn btn-primary dropdown-toggle m-4" data-bs-toggle="dropdown" aria-expanded="false">
					choose your name
				</button>
				<ul class="dropdown-menu">
					{store?.staff.map((item) => { return (<li onClick={() => setStaffMember({ full_name: item })}>{item.full_name}</li>) })}
				</ul>
			</div>

			<div>
				<input className="input-in-out m-1" name="fullName"
					value={staffMember?.full_name}
					onChange={handleChange} />
				<button className="btn btn-primary m-1" onClick={() => actions.createStaffMember(staffMember?.full_name)} >send me to the back end</button>
			</div>

			<div>
				<p> Time : {date.toLocaleTimeString()}</p>
				<p> Date : {date.toLocaleDateString()}</p>
			</div>

			<div className="d-flex flex-wrap">
				<div className="box-out m-2">
					<div>
						<h2 className="in">clock-out</h2>
						<h3></h3>
					</div>
				</div>
				<div className="box-in m-2">
					<div >
						<h2 className="out">clock-in</h2>
					</div>
				</div>
			</div>

		</div>
	);
};

InAndOut.propTypes = {
	match: PropTypes.object
};
