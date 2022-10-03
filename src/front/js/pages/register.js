import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Register = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ email: "", password: "", });
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (

        <div className="m-4 mt-5">
            <h1>Register</h1>
            <input placeholder="email" type="text" name="email" value={formData.email} onChange={handleChange}></input>
            <input placeholder="password" type="password" name="password" value={formData.password} onChange={handleChange}></input>
            <button onClick={() => actions.registerUser(formData.email, formData.password)}>Register</button>
        </div>
    );
};
