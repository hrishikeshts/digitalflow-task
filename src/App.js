import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/" className="home-link">
                        Home
                    </Link>
                    <div>
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </nav>
                <div className='body'>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/signup" exact>
                            <Signup />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
