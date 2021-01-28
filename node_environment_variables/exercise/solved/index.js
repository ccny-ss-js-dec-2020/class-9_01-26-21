/*
  Make this file log "Password Correct, you may enter" in the terminal
*/

// set your environment variable in your base profile
// export WEBSITE_PASSWORD=jar
var myWebsitePassword = process.env.WEBSITE_PASSWORD
var inputPassword = process.argv[2];

// if process.argv[2] is not null or not undefined
if(process.argv[2]){
  if(myWebsitePassword === inputPassword){
    console.log("Password Correct, you may enter")
  } else {
    console.log("Password Incorrect, you may not enter")
  }
} else {
  console.log("enter a third argument")
}
