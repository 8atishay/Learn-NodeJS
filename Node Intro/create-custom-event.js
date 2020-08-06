var events = require("events").EventEmitter;
var em = new events();

// can also use
// var events = require("events");
// var em = new events.EventEmitter();

// Subscribe the events
em.on("FirstEvent",function(){
    console.log("The first event is subscribed");
})
em.on("SecondEvent",function(data){
    console.log("The second event is subscribed, Message: "+data);
})
//The third event will be subscribed once only 
// no matter how many times is is published or called
em.once("ThirdEvent",function(){
    console.log("The third event is subscribed");
})

// Raise the events (Publishing the event)
em.emit("FirstEvent");
em.emit("SecondEvent", "Subscribed");
em.emit("ThirdEvent");
em.emit("FirstEvent");
em.emit("SecondEvent", "Subscribed");
em.emit("ThirdEvent"); 
