/*
  Importing the database connection from the ./database_connection.js file,
  where we are exporting it;

  We are exporting a function, so that is why when I import it, i have the
  opening and closing parentheses on the end there.
*/
var databaseConnection = require("./database_connection.js")();

/* Querying the students table from the first_sql database */
databaseConnection.query("SELECT * FROM students", function(err, res){
  /* If there's an error */
  if(err){
    /* Then stop the application and throw an Error */
    throw new Error(err)
  }
  /* Logging the result */
  console.log(res)
  /* Closing the connection */
  databaseConnection.end();
});
