import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const data = {
        username: username,
        name: name,
        email: email,
        password: password,
        address: address,
        mobile: mobile,
    };

    axios
        .post("signup", data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <div className="">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <small>must be a unique identification for you</small>
            </div>
            <div className="">
                <label>Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div className="">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <small>
                    must contain at least 8 characters, a number, an alphabet
                    and a symbol
                </small>
            </div>
            <div className="">
                <label>Address</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
            </div>
            <div className="">
                <label>Mobile number</label>
                <input
                    type="tel"
                    className="form-control"
                    onChange={(e) => {
                        setMobile(e.target.value);
                    }}
                />
            </div>
            <button className="btn">Sign up</button>
        </form>
    );
}
