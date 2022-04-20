// app.use(bodyParser.urlencoded({ extended:false}));
// assuming you put views folder in the same directory as app.js
// app.set('views', __dirname + '/views')
// app.set('view engine', 'ejs');

const express = require("express");
var app = express();
var http = require("http").createServer(app);

var cors = require("cors");
var port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// For Express version less than 4.16.0
// ------------------------------------
const bodyParser = require("body-parser");
const { Console } = require("console");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const sqlite3 = require("sqlite3").verbose();
// const db_name = path.join(__dirname, "data", "apptest.db");
const db_name = "db/db1.db";

app.get("/posts", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });

  const sql = "SELECT * FROM POSTS ";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
  db.close();
});

app.get("/", (req, res) => {
  res.send("API!");
});

var router = require("express").Router();

app.post("/post-detail/:slug", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });
  var slug = req.params.slug;
  const sql = "SELECT * FROM POSTS WHERE POST_SLUG LIKE '" + slug + "'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
  db.close();
});

app.put("/create", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });

  db.run(
    `INSERT INTO POSTS(POST_TITLE,POST_DESCRIPTION,POST_SENDER,POST_DATE,POST_SLUG) VALUES(?,?,?,?,?) `,
    [
      req.body.POST_TITLE,
      req.body.POST_DESCRIPTION,
      req.body.POST_SENDER,
      req.body.POST_DATE,
      req.body.POST_SLUG,
    ],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({
        message: "success",
        // data: rows,
        id: this.lastID,
      });
      // console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );

  // close the database connection
  db.close();
});

app.get("/delete/:slug", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });
  var slug = req.params.slug;
  db.run(
    "DELETE FROM POSTS WHERE POST_SLUG LIKE '" + slug + "'"  ,
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({
            message: "success",
      });
    }
  );

  // close the database connection
  db.close();
});


http.listen(port, () => {
  console.log(`server is running on ${port} port!`);
});
