const mysql = require('mysql');
const inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);

databaseConnection.connect();

/* <------------------------------------------------------------------> */

inquirer.prompt([
	{
		type: "list",
		message: "Which table would you like to select records from?",
		choices: ["Country People", "Students"],
		name: "table"
	},
  {
    type: "list",
    message: "Would you like to see all of the records or the last record added?",
    choices: ["All of the records", "Last record added"],
    name: "amount"
  }
]).then(function(answers){
  let table;
  if(answers.table === "Country People"){
    table = "country_people";
  } else {
    table = "students";
  }
  let queryString = "SELECT * FROM " + table;
  databaseConnection.query(queryString, function(err, data){
    if(answers.amount.includes("All")){
      console.log(data)
    } else {
      console.log(data.pop())
    }
    databaseConnection.end();
  });
});
