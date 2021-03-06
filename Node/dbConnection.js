// initialise a connection pool
const Pool = require("pg").Pool;
const db = new Pool({
  // establish a new connection
  user: "cyf", // Your user name
  host: "localhost",
  database: "cyf", // ... username again.
  password: "cyf",
  port: 5432
});

db.query(
  "SELECT firstname, lastname, email FROM volunteers",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
  }
);
