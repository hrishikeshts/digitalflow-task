import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider, makeStyles, Grid, Typography, Button } from "@material-ui/core";
import Illustration from "./Illustration.svg";
import Bubble from "./Bubble.svg";

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
                fontWeight: "600",
            },
        },
        MuiInput: {
            underline: "none",
        },
    },
    palette: {
        primary: {
            main: "#F7D832",
        },
        secondary: {
            main: "#F7D832",
        },
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        h1: {
            fontWeight: "700",
            fontSize: "2.5rem",
            marginBottom: "4.5rem",
            textDecoration: "none",
        },
        h5: {
            fontWeight: "700",
            fontSize: "1.8rem",
            paddingBottom: "1rem",
        },
        h6: {
            fontWeight: "700",
            paddingBottom: "2rem",
        },
    },
});

const useStyles = makeStyles({
    root: {
        fontFamily: "'Montserrat', sans-serif !important",
        userSelect: "none",
        minHeight: "100vh",
    },
    header: {
        textDecoration: "none",
    },
    text: {
        fontWeight: "500",
        fontSize: "0.95rem",
    },
    desc: {
        fontWeight: "500",
        fontSize: "0.95rem",
        lineHeight: "1.2rem",
        width: "80%",
        marginLeft: "auto",
    },
    link: {
        textDecoration: "none",
        fontWeight: "700",
        color: "black",
    },
    reset: {
        textDecoration: "none",
        fontWeight: "600",
        color: "#333333",
    },
    firstGrid: {
        padding: "3rem 0 5vh 8vw",
    },
    secondGrid: {
        textAlign: "right",
        backgroundImage: `url(${Bubble})`,
        backgroundRepeat: "no-repeat",
        padding: "3rem 8vw 10vh 0",
    },
    thirdGrid: {},
    label: {
        fontSize: "0.7rem",
        fontWeight: "600",
        color: "#A5A5A5",
    },
    textField: {
        backgroundColor: "#F0F0F0",
        border: "none",
        borderRadius: "5px",
        width: "18rem",
        height: "2.5rem",
        padding: "0 1rem",
        margin: "0.4rem 1rem 0.8rem 0",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "500",
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.13)",
        },
        "&:focus-visible": {
            outline: "none",
        },
    },
    loginBtn: {
        width: "20rem",
        marginTop: "1.5rem",
        marginBottom: "2.5rem",
    },
    testBtn: {
        width: "10rem",
        marginBottom: "5rem",
    },
    img: {
        width: "25rem",
        paddingTop: "3rem",
    },
    footer: {
        textDecoration: "none",
        color: "black",
        marginRight: "3rem",
        fontWeight: "500",
        fontSize: "1rem",
    },
});

function App() {
    const classes = useStyles();

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Grid container alignContent="space-between" justify="flex-end" className={classes.root}>
                    <Grid item md="6" className={classes.secondGrid}>
                        <Button variant="contained" color="primary" disableElevation className={classes.testBtn}>
                            Test
                        </Button>
                        <Typography variant="h5">Unlock your stuck revenue.</Typography>
                        <Typography className={classes.desc}>
                            We help you unlock the true potential connect with your customers to understand the rights and wrongs with your product.
                        </Typography>
                        <img src={Illustration} alt="User Onboarding" draggable="false" className={classes.img} />
                    </Grid>
                    <Grid item md="6" xs="12" className={classes.firstGrid}>
                        <Link to="/" className={classes.header}>
                            <Typography variant="h1" color="primary">
                                DOOF
                            </Typography>
                        </Link>
                        <Typography variant="h6">Login</Typography>
                        <div>
                            <label className={classes.label}>Email</label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Email"
                                onChange=""
                                className={classes.textField}
                                classes={{ focused: classes.textField }}
                            />
                        </div>
                        <div>
                            <label className={classes.label}>Password</label>
                            <br />
                            <input
                                type="password"
                                id="pass"
                                name="password"
                                required
                                placeholder="Password"
                                onChange=""
                                className={classes.textField}
                                classes={{ focused: classes.textField }}
                            />
                            <label className={classes.label}>
                                <Link to="/reset" className={classes.reset}>
                                    Forgot Password
                                </Link>
                            </label>
                        </div>
                        <Button type="submit" variant="contained" color="primary" disableElevation className={classes.loginBtn}>
                            Login
                        </Button>
                        <Typography className={classes.text}>
                            Don't have an account yet?&nbsp;
                            <Link to="/signup" className={classes.link}>
                                Sign up
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item md="12" className={classes.thirdGrid}>
                        <Link to="/terms" className={classes.footer}>
                            Terms of Service
                        </Link>
                        <Link to="/privacy" className={classes.footer}>
                            Privacy Policy
                        </Link>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Router>
    );
}

export default App;
