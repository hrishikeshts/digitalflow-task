import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get("status", {
                headers: {
                    "access-token": localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.auth) {
                    setStatus(true);
                    setData(res.data.user);
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus(false);
            });
    }, []);

    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/" className="home-link">
                        Home
                    </Link>
                    {status ? (
                        <a
                            href="/"
                            onClick={() => {
                                localStorage.clear();
                            }}
                        >
                            Log out
                        </a>
                    ) : (
                        <div>
                            <Link to="/login">Log in</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                </nav>
                <div className="body">
                    <Switch>
                        <Route path="/login" exact>
                            <Login
                                status={status}
                                setStatus={setStatus}
                                setData={setData}
                                data={data}
                            />
                        </Route>
                        <Route path="/" exact>
                            <Home status={status} data={data} />
                        </Route>
                        <Route path="/signup" exact>
                            <Signup status={status} setStatus={setStatus} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
