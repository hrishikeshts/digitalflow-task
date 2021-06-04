import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Login({ status, setStatus }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState("");

    const login = (e) => {
        e.preventDefault();

        axios
            .post("login", {
                id: id,
                password: password,
            })
            .then((res) => {
                console.log("POST request for login sent to port 4000...");
                if (!res.data.auth) {
                    setAlert(res.data.message);
                    console.log(res.data.message);
                    setStatus(false);
                } else {
                    setAlert("");
                    console.log(res);
                    setStatus(true);
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus(false);
            });
    };
    if (status) {
        return <Redirect to="/" />;
    } else {
        return (
            <form onSubmit={login}>
                <h2>Log in</h2>
                <small className={alert ? "alert" : "hidden"}>
                    {alert}&nbsp;
                </small>
                <div className="">
                    <label>Username or email address</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </div>
                <div className="">
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type="submit">Log in</button>
            </form>
        );
    }
}
