const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { verifyToken } = require("./jwt");
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "database",
    database: "authentication", // Comment this for initial run, as this can be used only after database is created
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected...");
});

require("./sql")(app, db); // GET requests to create schemas

app.post("/signup", async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            mobile: req.body.mobile,
        };
        db.query(
            "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)",
            [
                user.username,
                user.name,
                user.email,
                user.password,
                user.address,
                user.mobile,
            ],
            (err, result) => {
                if (err) {
                    if (err.code == "ER_DUP_ENTRY") {
                        console.log("Duplicate entry entered...");
                        res.send({ alert: true });
                    } else {
                        console.log(err);
                        res.status(500).send();
                    }
                } else {
                    console.log("POST request for signup received...");
                    res.status(201).send("User data saved to database...");
                    console.log(result);
                }
            }
        );
    } catch {
        res.status(500);
    }
});

app.post("/login", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE username = ? OR email = ?",
        [id, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else if (result.length > 0) {
                bcrypt.compare(
                    password,
                    result[0].password,
                    (err, response) => {
                        if (response) {
                            console.log("Password verified...");

                            const userData = result[0];
                            const token = jwt.sign(
                                { userData },
                                process.env.SECRET
                            );
                            // req.session.user = result;

                            res.json({
                                auth: true,
                                token: token,
                                result: result,
                            });
                        } else {
                            res.json({
                                auth: false,
                                message: "Invalid password!",
                            });
                            console.log("Password can't be matched!");
                        }
                    }
                );
            } else {
                res.json({
                    auth: false,
                    message: "User doesn't exist! Sign up to continue...",
                });
                console.log("No match found from database!");
            }
        }
    );
});

app.get("/status", verifyToken, (req, res) => {
    res.json({
        auth: true,
        message: "You are now authenticated...",
        user: req.userData,
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
