import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();

        axios
            .post("login", {
                id: id,
                password: password,
            })
            .then((res) => {
                console.log(res);
                console.log("POST request for login sent to port 4000...");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={login}>
            <h2>Log in</h2>
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
