// TCP to UNIX socket server proxy
// Tomi Juntunen

var Toolbox = require('toolbox-js');
var ArgParse = Toolbox.ArgParse;
var Net = require('net');

var argParse = new ArgParse("tcup: a simple TCP to UNIX socket proxy.");

argParse.addArgument({
    "short":        "s",
    "long":         "socket_path",
    "variable":     "socketPath",
    "description": 	"UNIX socket filename",
    "mode":         "required"
});

argParse.addArgument({
    "short":        "p",
    "long":         "port",
    "variable":     "port",
    "description":  "port to bind the server to",
    "default":      "8080",
    "mode":         "optional"
})


var argv = process.argv.slice(2);

argParse.parse(argv);

var port = parseInt(argParse.get("port")[0]);
var socket = "./socket";

var proxy = Net.createServer(function(socket) {
    var path = argParse.get("socketPath")[0];
    var client = Net.createConnection(path);

    socket.pipe(client).pipe(socket);

    socket.on("connect", function() {
        console.log("client connected");
    });

    socket.on("disconnect", function() {
        console.log("client disconnected");
    })

    socket.on("error", function(err) {
        throw new Error("Error occurred: " + err.toString());
    });
});

proxy.listen(port);

process.on('SIGINT', function() {
    console.log("Caught interrupt signal. Cleaning up...");
    proxy.close();
});
