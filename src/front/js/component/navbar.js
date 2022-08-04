import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="navbar navbar-primary bg-primary">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1 text-dark">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/calendar">
						<button className="btn btn-light m-1">calendar</button>
					</Link>
					<Link to="/chart">
						<button className="btn btn-light m-1">Chart</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
