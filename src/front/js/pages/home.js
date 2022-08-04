import React, { useContext } from "react";
import { Context } from "../store/appContext";
import wave from "../../img/wave.png";
import chart from "../../img/chart.jpg";
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
			<div className="waves">
				<div className="wave wave-dark" >
					<div className="water"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 32" preserveAspectRatio="none">
						<title>wave2</title>
						<path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"></path>
					</svg></div>
					<div className="water"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 32" preserveAspectRatio="none">
						<title>wave2</title>
						<path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"></path>
					</svg></div>
				</div>
				<div className="wave wave-light" >
					<div className="water"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 32" preserveAspectRatio="none">
						<title>wave2</title>
						<path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"></path>
					</svg></div>
					<div className="water"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 32" preserveAspectRatio="none">
						<title>wave2</title>
						<path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"></path>
					</svg></div>
				</div>

			</div>
		</div>
	);
};
