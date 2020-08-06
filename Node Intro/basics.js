// Core Module
var os = require('os');

console.log("Host : "+ os.hostname());
console.log("Free Memory : "+ os.freemem());
console.log("Total Memory : "+ os.totalmem());


// Local Modules
var maths= require("./local");
console.log(maths.maximum);
maths.info();


// npm init is used to create json file 
// npm install is used to install all the dependencies
// Third Party Modules (NPM : Node Package Manager)
// and give details of project
// npm instal modulename is used to install a module
// -g is used to name a module global
// npm instal modulename -g


