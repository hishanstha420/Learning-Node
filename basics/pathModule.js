const path = require("path");
var pathObj = path.parse(__filename);
var dirPath = path.parse(__dirname);
console.log(pathObj);
console.log(dirPath);
