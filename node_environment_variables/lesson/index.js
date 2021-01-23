/*
  You should not store credentials in files and then push them up to github.
  Private credentials should be stored in what are called Environment Variables.
  You can access these environment variables locally using node and server-side javascript

  In your Terminal/Git Bash:
  1. type 'cd ~'
  2. type 'vi .bash_profile'
  3. You will now be in the bash/terminal editor
  4. Type 'i' to write to the file
  5. Paste this line: export LOCAL_DATABASE='mysql://root:@localhost:3306/first_sql'
  6. Press the 'escape' key. Type in ':wq' and press the 'enter' key
  7. Close all terminals and then re-open your terminal
  8. type 'env' in your terminal/bash, and you should see the LOCAL_DATABASE environment variable there
*/

/*
  Now that we have created that environment variable locally,
  lets access it in our code using 'process.env'
  'process.env' is built into node in order to access environment variables
*/
const localDatabaseConnection = process.env.LOCAL_DATABASE
console.log(localDatabaseConnection);

/*
  Lets connect to our database now that we have the connection value
  in our code through the variable that holds the value for the environment variable

  First, in the terminal, run 'npm i mysql --save' and import mysql into this file
*/
const mysql = require('mysql');
/* Put the database connection string value into the mysql.createConnection function */
const databaseConnection = mysql.createConnection(localDatabaseConnection);

/* Connect to the database */
databaseConnection.connect(function(err, res){
  // if there's an error connecting
  if(err){
    // then throw an error and stop this file from running
    throw new Error(err)
  }
  // if a successful connection, then yay
  console.log("Successfully Connected to Database");
  console.log(res);
});
databaseConnection.end();
