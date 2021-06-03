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
        "SELECT password FROM user WHERE username = ? OR email = ?",
        [id, id],
        async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else if (result.length > 0) {
                if (await bcrypt.compareSync(password, result[0].password)) {
                    res.send({ alert: 3 });
                    console.log("Password verified...");
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

// app.post("/login", async (req, res) => {
//     const id = req.body.id;
//     const password = req.body.password;
//     let data;

//     db.query(
//         "SELECT username, email, password FROM user WHERE username = ? OR email = ?",
//         [id, id]
//     )
//         .then((result) => {
//             data = result;
//         })
//         .then(() => {
//             if (await bcrypt.compare(req.body.password, user.password)) {
//                 res.send("Success");
//             } else {
//                 res.send("Not allowed");
//             }
//         });
// });

// app.post("/login", async (req, res) => {
//     const id = req.body.id;
//     const password = req.body.password;

//     db.query(
//         "SELECT username, email, password FROM user WHERE username = ? OR email = ?",
//         [id, id],
//         async (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send();
//             } else {
//                 if (results.length > 0) {
//                     const comp = await bcrypt.compare(
//                         password,
//                         results[0].password
//                     );

//                     if (comp) {
//                         res.send({
//                             code: 200,
//                             success: "login successful",
//                             id: results[0].id,
//                             userName: results[0].user_name,
//                             score: results[0].score,
//                             gamesPlayed: results[0].gamesPlayed,
//                             boardPref: results[0].boardPref,
//                         });
//                     } else {
//                         res.send({
//                             code: 204,
//                             error: "Email and password does not match",
//                         });
//                     }
//                 } else {
//                     res.send({
//                         code: 206,
//                         error: "Email does not exist",
//                     });
//                 }
//             }
//         }
//     );
// });

// app.post("/login", async (req, res) => {
//     const user = users.find((user) => (user.name = req.body.name));
//     if (user == null) {
//         return res.status(400).send("Cannot find user");
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             res.send("Success");
//         } else {
//             res.send("Not allowed");
//         }
//     } catch {
//         res.status(500).send();
//     }
// });

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
