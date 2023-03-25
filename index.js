//index.js file
var mysql = require('mysql');
const bodyParser= require ("body-parser");

const express = require ("express");
const app = express();
const port = 8089;
app.use(bodyParser.urlencoded({ extended: true }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "calorieBuddy"
  });
con.connect();
require("./routes/main")(app, con);
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
