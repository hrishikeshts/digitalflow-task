import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const data = {
        id: id,
        password: password,
    };

    axios
        .post("login", data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <div className="">
                <label>Username or email address</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setId(e.target.value);
                    }}
                />
            </div>
            <div className="">
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <button className="btn">Log in</button>
        </form>
    );
}
