import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/calendar">
						<button className="btn btn-primary">calendar</button>
					</Link>
					<Link to="/chart">
						<button className="btn btn-primary">Chart</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
