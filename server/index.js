const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
const { createTokens, validateToken } = require("./jwt");

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

app.post("/login", async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    await db.query(
        "SELECT username, email, password FROM user WHERE username = ? OR email = ?",
        [id, id],
        async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else if (result.length > 0) {
                if (await bcrypt.compareSync(password, result[0].password)) {
                    try {
                        // res.send({ alert: 3 });
                        console.log("Password verified...");

                        const accessToken = createTokens(result[0]);
                        res.cookie("access-token", accessToken);
                    } catch {
                        console.log("Error in bcrypt.compareSync()...");
                    }
                } else {
                    res.send({ alert: 2 });
                    console.log("Password can't be matched!");
                }
            } else {
                res.send({ alert: 1 });
                console.log("No match found from database!");
            }
        }
    );
});

app.get("/profile", validateToken, (req, res) => {
    res.json("profile");
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
