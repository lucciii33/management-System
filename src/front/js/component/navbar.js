import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
				</div>
			</div>
		</div>
	);
};
