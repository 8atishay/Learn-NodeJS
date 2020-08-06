var express = require('express');
var app = express();
var server = require('http').Server(app);
var ioclient = require('socket.io')(server).sockets;
// var path = require('path');
var ip = require('ip');
const { config } = require('process');
const { throws } = require('assert');
const { connect } = require('http2');
var mongo = require('mongodb').MongoClient;

var port = process.env.PORT || 3000;

// Connect to mongo
mongo.connect(process.env.MONGODB_URI||'mongodb://localhost:27017',
    { useUnifiedTopology: true},
    function(err,client){
        
        var db = client.db('chatdb') ;
        
        if(err){
            throw err;
        }else{
            console.log('Mongo connected');
            // connect to socket.io
            ioclient.on('connect',function(socket){
                console.log('A new user is connected.');

                //Get chats from mongo collection
                // chat.find().limit(100).sort({_id:1}).toArray(function(err,res){
                //     if(err){
                //         throw err;
                //     }
                //     // Emit the messages
                //     socket.emit('output',res);
                // })

                // handle input event
                
                let chat = db.collection('chats');
                socket.on('input',function(data){

                    // Create function to send status
                    SendStatus = function(s){
                        socket.emit('status',s);
                    }

                    let name = data.name;
                    let message = data.message;
                    // check name and message
                    if(name==""||message==""){
                        // Send error status
                        SendStatus('Please enter a name and message');
                    }else{
                        chat.insertOne({name: name, message: message});

                        chat.find().limit(100).sort({_id:1}).toArray(function(err,data){
                            if(err){
                                throw err;
                            }
                            var jsi = 6;
                            ioclient.emit('output',data,data.length);
                            SendStatus({
                                message: "Message sent",
                                clear: true
                            })
                        })    
                    }
                })

                // Handle clear
                socket.on('clear',function(data){
                    // Remove all chats form collection
                    chat.deleteMany({},function(){
                        socket.emit('cleared');
                    })
                })

                // send status objects

                socket.on("disconnect",function(){
                    console.log('A user is dicsconnected.');
                })
            })
        }
    })



// io.on('connect',function(socket){
//     console.log('New connection made.');
//     socket.on('disconnect',function(){
//         console.log('A user is disconnected');
//     })
// })

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

server.listen(port,function(){
    console.log('The server is listening at http:/'+ip.address()+":"+port);
})