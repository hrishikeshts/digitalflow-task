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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
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
                if (err) throw err;
                console.log(result);
            }
        );

        console.log("POST request for signup received...");
        res.status(201).send("User data saved to database...");
    } catch {
        res.status(500);
    }
});

app.post("/login", async (req, res) => {
    const user = users.find((user) => (username = req.body.name));
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
