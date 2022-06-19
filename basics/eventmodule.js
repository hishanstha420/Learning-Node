//naming convention of class=>
const EventEmitter = require("events");
const emitter = new EventEmitter(); //emitter is Object

//emitter.emit() used to raise an event

//Register a listener
emitter.on("messageLogged", (eventArg) => {
  console.log("Listener called", eventArg);
});

// Event raised
emitter.emit("messageLogged", { id: 1, url: "http://" });
