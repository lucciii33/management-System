import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const InAndOut = props => {

	const [staffMember, setStaffMember] = useState({ full_name: "" });
	const handleChange = e => {
		setStaffMember({ ...staffMember, [e.target.name]: e.target.value });
	};

	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getStaffMembers();
	}, [])

	return (
		<div className="jumbotron">
			<h1>working</h1>


			<div className="btn-group">
				<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
					Action
				</button>
				<ul class="dropdown-menu">
					{store.staff.map((item) => { return (<li>{item.Full_Name}</li>) })}
				</ul>
			</div>

			<div>
				<input className="input-in-out m-1" name="fullName"
					value={staffMember.full_name}
					onChange={handleChange} />
				<button className="btn btn-primary m-1" onClick={() => actions.createStaffMember(staffMember.full_name)} >send me to the back end</button>
			</div>

			<div className="d-flex flex-wrap">
				<div className="box-out m-2">
					<div>
						<h2 className="in">clock-out</h2>
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
