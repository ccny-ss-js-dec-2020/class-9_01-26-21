/*
  Make this file log "Password Correct, you may enter" in the terminal
*/

var myWebsitePassword = process.env.WEBSITE_PASSWORD
var inputPassword = process.argv[2];

if(myWebsitePassword === inputPassword){
  console.log("Password Correct, you may enter")
} else {
  console.log("Password Incorrect, you may not enter")
}
