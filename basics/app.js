function sayHello(name) {
  console.log("Hello" + name);
}

sayHello("John");
//global
console.log(); //global
setTimeout(); //call function after delay
clearTimeout();
setInterval();
clearInterval();

const log = require("./logger"); //require function returns object exported from target module
//prefer const over var so that logger doesnt get overwritten
//logger=1;
log("message");
