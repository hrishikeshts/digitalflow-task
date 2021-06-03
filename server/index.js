const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

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

require("./sql/create")(app, db); // GET requests to create schemas

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
                        res.status(409).send(
                            "Username or email already exists!"
                        );
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

const users = [];

app.post("/login", async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    db.query(
        "SELECT username, email, password FROM user WHERE username = ? OR email = ?",
        [id, id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            console.log(result[0].username);
        }
    );

    const user = users.find((user) => (username = req.body.name));
    if (user == null) {
        return res.status(400).send(`User doesn't exist!`);
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("User logged in...");
        } else {
            res.send("Invalid password!");
        }
    } catch {
        res.status(500);
    }
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
