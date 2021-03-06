var app = require('../index');
var debug = require('debug')('mean-app:server');
var http = require('http');

/* Get port from environment and store in express*/

var port = normalizePort(process.env.port||'3000');
app.set('port',port);

/** Create HTTP server */

var server = http.createServer(app);

// Listen on provided port, on all network interface 

server.listen(port,function(){
    console.log('Connected to server '+port);
});
server.on('error',onError);
server.on('listening',onListening);

// NOrmalise a port into a number, string or false 

function normalizePort(val){
    var port= parseInt(val,10);

    if (isNaN(port)){
        // named pipe
        return val;
    }
    if (port>=0){
        // port number
        return port;
    }
    return false;
}

// Event listener for http server "error" event. 

function onError(error){
    if(error.syscall!=='listnen'){
        throw error;
    }
    var bind = (typeof port === 'string') ? ('Pipe'+port) :('Port'+port);

    // handle specific listen errors with friendly messages
    switch(error.code){
        case 'EACCES':
            console.error(bind+' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADORINUSE':
            console.error(bind+' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server 'listening' event. 

function onListening(){
    var addr = server.address();
    var bind = (typeof port === 'string') ? ('pipe'+port) :('port'+port);
    debug('Listening on '+bind);
}
