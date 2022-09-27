import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="navbar navbar-primary bg">

			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1 text-dark">LUCCICODE</span>
				</Link>
				<div className="ml-auto">
					<Link to="/calendar">
						<button className="btn btn-light m-1">Calendar</button>
					</Link>
					<Link to="/chart">
						<button className="btn btn-light m-1">Chart</button>
					</Link>
					<Link to="/inAndOut">
						<button className="btn btn-light m-1">Ready to work?</button>
					</Link>
					<Link to="/getDishes">
						<button className="btn btn-light m-1">Restaurant sotfware</button>
					</Link>
					{store.user ?
						(<button className="btn btn-light m-1" onClick={actions.logout()}>Log OUT</button>)
						:
						(<Link to="/login">
							<button className="btn btn-light m-1">Login</button>
						</Link>)}
				</div>
			</div>
		</div>
	);
};
