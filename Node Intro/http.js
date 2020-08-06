
// to stop server press Ctrl+C
// installed NODEMON globally 
// to avoid restarting server again and again
// run by nodemon createserver.js

var http = require("http");
var server = http.createServer(function(req,res){
    //handle incoming request
    if(req.url=="/"){
        // status code: 200 = OK
        //              404 = Page not found
        res.writeHead(200,{"Content-Type":"text/plain"});
        // res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>This is home page</h1>");
        res.end();
    }
    else if(req.url=="/user"){
        res.write("This is user page");
        res.end();
    }
    else if(req.url=="/admin"){
        res.write("This is admin page");
        res.end();
    }
    else if(req.url=="/data"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify({"message":"Hello World"}));
        res.end();
    }
    else{
        res.write("Invalid Request");
        res.end();
    } 
})

server.listen(5000);
console.log('Node web server is running at port 5000')

