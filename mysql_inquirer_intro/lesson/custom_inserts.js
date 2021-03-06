/*
	In this lesson, I will be:
	- Adding records to a table using Inquirer and MySql NPM Modules
	- Selecting between 2 tables to add to
*/

//setup for connecting to database from node (server side javascript)

//importing the mysql module into this file
var mysql = require('mysql');
//importing the inquirer module into this file
var inquirer = require('inquirer');

//creating a database client to connect to,
//which as you see, uses the object that we set up
var databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);

// connecting to the database
// you dont need to put function after connect
// you can put the function after connect if you want to customize logs
databaseConnection.connect();

/* <------------------------------------------------------------------> */

// Prompting the user to choose which table to add a record to
// We have added the 'country_people' and 'students' tables to our first_sql database previousyly
inquirer.prompt([
		{
			type: "list",
			message: "Which table would you like to add a record to?",
			choices: ["Country People", "Students"],
			name: "table"
		}
	]).then(function(answers){
		/*
			Once the user is done answering the first round of questions,
			everything that you need to do with the answers
			to those questions will go in between
			the opening curly bracket after (answers) right above
			and before its closing "})"

			In more technical terms,
			once inquirer has finished,
			then all the code will go in the callback.
			The callback being .then(function(answers){}
		*/
		// If the user chooses "Country People"
		if(answers.table === "Country People"){
			/*
				then prompting the user to input values for each column in the 'country_people' table
			*/
			inquirer.prompt([
				{
					type: "input",
					message: "What is the value for the 'name' column?",
					name: "name"
				},
				{
					type: "input",
					message: "What is the value for the 'country of origin' column?",
					name: "country_of_origin"
				},
				{
					type: "input",
					message: "What is the value for the 'primary language' column?",
					name: "primary_language"
				}
			]).then(function(answers){
				/*
					Once the user is done answering the second round of questions,
					everything that you need to do with the answers
					to those questions will go in between
					the opening curly bracket after (answers) right above
					and before its closing "})"

					In more technical terms,
					once inquirier has finished,
					then all the code will go in the callback.
					The callback being .then(function(answers){}
				*/
				/*
					after the user has input all the values, then do the insert into the 'country_people' table
				*/
				//storing all of my answers in variables
				const name = answers.name;
				const countryOfOrigin = answers.country_of_origin;
				const primaryLanguage = answers.primary_language;

				/*
					The logic for once the information is inserted into the database
					goes in the callback from the .query function
					.query('query', function(err, result) { logic for once inserted into database goes here })
				*/
				// inserting the users input answers into the sql query string starting with INSERT INTO
				const insertCountryPeopleQuery = "INSERT INTO country_people (name, country_of_origin, primary_language) VALUES ('"+name+"','"+countryOfOrigin+"','"+primaryLanguage+"')"
				console.log(insertCountryPeopleQuery);
				databaseConnection.query(insertCountryPeopleQuery, function(err, result) {
					if(err){
						//if there was an error when calling the database
						//then logging the error
						console.log(err);
					} else {
						// if not error, then logging the successful response from the database insert here
				    console.log("Logging the response")
				    console.log(result);

				    // closing the database connection
						databaseConnection.end();
					}
				});
			});
		} else {
			// If the user chooses "Students"
			/*
				then prompting the user to input values for each column in the 'students' table
			*/
			inquirer.prompt([
				{
					type: "input",
					message: "What is the value for the 'name' column?",
					name: "name"
				},
				{
					type: "input",
					message: "What is the value for the 'age' column?",
					name: "age"
				}
			]).then(function(answers){
				/*
					Once the user is done answering the second round of questions,
					everything that you need to do with the answers
					to those questions will go in between
					the opening curly bracket after (answers) right above
					and before its closing "})"

					In more technical terms,
					once inquirier has finished,
					then all the code will go in the callback.
					The callback being .then(function(answers){}
				*/
				/*
					after the user has input all the values, then do the insert into the 'students' table
				*/
				//storing all of my answers in variables
				const name = answers.name;
				const age = answers.age;

				/*
					The logic for once the information is inserted into the database
					goes in the callback from the .query function
					.query('query', function(err, result) { logic for once inserted into database goes here })
				*/
				// inserting the users input answers into the sql query string starting with INSERT INTO
				// as you can see, age is not wrapped around single quotes because it is an integer datatype, which sql accepts with or without single quotes
				const insertIntoStudentsTableQuery = "INSERT INTO students (name, age) VALUES ('"+name+"',"+age+")";
				console.log(insertIntoStudentsTableQuery);
				databaseConnection.query(insertIntoStudentsTableQuery, function(err, result) {
					if(err){
						//if there was an error when calling the database
						//then logging the error
						console.log(err);
					} else {
						// if not error, then logging the successful response from the database insert here
				    console.log("Logging the response")
						// response for an addition to the database doesn't give much info
						// confirm it was added in the database
						console.log(result);

				    // closing the database connection
						databaseConnection.end();
					}
				});
			});
		}
});
