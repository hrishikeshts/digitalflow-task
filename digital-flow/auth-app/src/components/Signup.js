import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Signup({ status, setStatus, setData }) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const [alert, setAlert] = useState(false);

    const signup = (e) => {
        e.preventDefault();

        axios
            .post("signup", {
                username: username,
                name: name,
                email: email,
                password: password,
                address: address,
                mobile: mobile,
            })
            .then((res) => {
                console.log("POST request for signup sent to port 4000...");
                if (!res.data.auth) {
                    setAlert(true);
                    console.log(res.data.message);
                    setStatus(false);
                } else {
                    setAlert(false);
                    console.log(res);
                    setData({
                        username: username,
                        name: name,
                        email: email,
                        password: password,
                        address: address,
                        mobile: mobile,
                    });
                    setStatus(true);
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (status) {
        return <Redirect to="/" />;
    } else {
        return (
            <form onSubmit={signup}>
                <h2>Sign up</h2>
                <small className={alert ? "alert" : "hidden"}>
                    Username/email exists! Log in to continue...
                </small>
                <div className="">
                    <label>Username</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        className={alert ? "alert-box" : ""}
                    />
                </div>
                <div className="">
                    <label>Email address</label>
                    <input
                        type="email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className={alert ? "alert-box" : ""}
                    />
                </div>
                <div className="">
                    <label>Full Name</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="">
                    <label>Password</label>
                    <input
                        type="password"
                        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                        title="must contain at least one number, one alphabet and one symbol, and at least 8 or more characters"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="">
                    <label>Postal address</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </div>
                <div className="">
                    <label>Mobile number</label>
                    <input
                        type="tel"
                        required
                        title="must be a valid 10 digit mobile number"
                        pattern="[5-9][0-9]{9}"
                        onChange={(e) => {
                            setMobile(e.target.value);
                        }}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
        );
    }
}
