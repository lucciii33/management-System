import React, { useContext } from "react";
import { Context } from "../store/appContext";
import wave from "../../img/wave.png";
import chart from "../../img/chart.jpg";
import imagetwo from "../../img/imagetry.png";
import curt2 from "../../img/curt2.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 conta-home">
			<div className="d-flex ">
				<div className="text">
					<h1>Grow your apps. <br /> Accelerate your business.</h1>
					<h5>Our solutions are built to expand your audience and your revenue.</h5>
					<p>Our solutions are built to expand your audience and your revenue.</p>
					<button className="btn btn-primary">Start here</button>
				</div>
				<div>
					<img src={chart} className="chart" ></img>
				</div>
			</div>
			<div>

				<div className="home2">
					<div>
						<img src={imagetwo} className="imagetwo" ></img>
					</div>
					<div className="text2">
						<h2>why management is important</h2>
						<p>Importance of Management It helps in Achieving Group Goals - <br />It arranges the factors of production, assembles and organizes the resources,<br /> integrates the resources in effective manner to achieve goals. <br />It directs group efforts towards achievement of pre-determined goals.</p>
						<button className="btn btn-light p-2 m-3">Start here</button>
					</div>
				</div>

				<div className="d-flex mb-5 p-5">
					<div>
						<img src={curt2} className="imagetwo" ></img>
					</div>
					<div className="text">
						<h2>What are the benefits of <br /> project management?</h2>
						<ul>
							<ol>Defining Responsibilities</ol>
							<ol>Managing Communication</ol>
							<ol>Managing Project Risk</ol>
							<ol>Advance Strategic Management</ol>
							<ol>Managing Teams</ol>
						</ul>
						<button className="btn btn-primary">Start here</button>
					</div>
				</div>

			</div>
		</div>
	);
};
