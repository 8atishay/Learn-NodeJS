// here we do not create server by express 
// because it does not give protocol integration
// when we take care of socket or network protocols
// our server should run at a specific protocol
// so we create server usin http to provide http protocol

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

var clients=0;
users = [];
// connect and connection are synonym
io.on('connect',function(socket){
    console.log('A user is connected, ID:'+socket.id);
    clients++;
    
    // broadcasting for all sockets
    io.sockets.emit('broadcast',{message: clients+" clients are conected with us"});
    // type 2 broadcasting only for new connections
    socket.emit('newClientConnected',{message:"Hello new client"});
    // type 3 broadcasting only for previously connected clients
    socket.broadcast.emit('newClientConnected',{message:clients+" clients are connected with us"});

    setTimeout(function(){
        socket.send('Thanks for joinig us');
        // userdefined event
        socket.emit('testEvent',"This is test event");
    },5000);

    socket.on('disconnect',function(){
        clients--;
        console.log('User is disconnected, ID:'+socket.id);
        io.sockets.emit('broadcast',{message: clients+" clients are connected with us"});
        socket.broadcast.emit('newClientConnected',{message:clients+" clients are connected with us"});
    })
     
    //chat application
    socket.on('setUsername',function(data){
        if(users.indexOf(data) == -1){
            users.push(data);
            socket.emit('newUserSet',{username:data});
        }else{
            socket.emit('userAlreadyExist',data + " already exist. Try with some other username");
        }
    })

    socket.on('msg',function(data){
        io.sockets.emit('NewMessage',data);
    })
})

server.listen(5000,function(){
    console.log("The server is running at port 5000!!");
})