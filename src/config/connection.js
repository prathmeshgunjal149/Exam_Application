const mysql = require("mysql2");

const conn = mysql.createConnection({  // create a connection to database
  host: "localhost",
  user: "root",
  password: "root", // password
  database: "ExamApplication"  // database name
});

conn.connect((err) => { // connect to database
  if (err) {
    console.error("Database not connected", err); // error message
  } else {
    console.log("Database is connected......"); // success message
  }
});

module.exports = conn; // export the connection object
