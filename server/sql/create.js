module.exports = function create(app, db) {
    // Create database 'authentication'
    app.get("/create/database", (req, res) => {
        let sql = "CREATE DATABASE authentication";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Database 'authentication' created...`);
        });
    });

    // Create table 'user'
    app.get("/create/table", (req, res) => {
        let sql =
            "CREATE TABLE user (username VARCHAR(255), name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), address VARCHAR(255), mobile CHAR(10), PRIMARY KEY (username), UNIQUE (email))";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Table 'user' created...");
        });
    });
};
