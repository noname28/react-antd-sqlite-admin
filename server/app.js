// app.use(bodyParser.urlencoded({ extended:false}));
// assuming you put views folder in the same directory as app.js
// app.set('views', __dirname + '/views')
// app.set('view engine', 'ejs');

const express = require("express");
var app = express();
var http = require("http").createServer(app);

var cors = require("cors");
var port = 3001;

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
const db_name = "db/user.db";

app.get("/posts", (req, res) => {
  console.log("Username : " , req.query.username);
  console.log("Password : " , req.query.password);
  const username = req.query.username;
  const password = req.query.password;
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });
  let sql = "";
  if (username === "" || username === undefined)
  {
    sql = "SELECT * FROM BS_USER ";
  }
  else
  {
    sql = "SELECT * FROM BS_USER WHERE USERNAME like '" + username + "' AND PASSWORD like '" + password + "' ";
  }

  console.log("sql : ",sql);

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      return console.error('err : ', err.message);
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
  db.close();
});

app.get("/posts", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  const sql = "SELECT * FROM BS_USER ";
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

app.post("/user-detail/:id", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });
  var id = req.params.id;
  const sql = "SELECT * FROM BS_USER WHERE USERNAME LIKE '" + id + "'";
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
    `INSERT INTO BS_USER(USERNAME,NAME,SURNAME,AGE,ACTIVE,LAST_LOGIN,PASSWORD) VALUES(?,?,?,?,?,?,?) `,
    [
      req.body.USERNAME,
      req.body.NAME,
      req.body.SURNAME,
      req.body.AGE,
      req.body.ACTIVE,
      '',
      req.body.PASSWORD
    ],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({
        message: "success",
        // data: rows,
        
      });
      // console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );

  // close the database connection
  db.close();
});

app.get("/delete/:username", (req, res) => {
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful connection to the database 'db1.db'");
  });
  var username = req.params.username;
  db.run(
    "DELETE FROM BS_USER WHERE USERNAME LIKE '" + username + "'"  ,
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
