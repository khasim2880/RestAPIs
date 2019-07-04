let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const http = require("http").Server(app);
const io = require("socket.io")(http);
global.config = require('./config/config');

mongoose.connect("mongodb+srv://khasim:12345@cluster0-mglvd.mongodb.net/backend?retryWrites=true&ssl=true", { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* CORS */
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Content-Type", "application/json");
    res.header('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }else {
        next();
    }
});

app.use(require('./controllers'));

/*app.listen(process.env.PORT || 1330, function(){
    console.log('App running on 1330');
});*/
var clients = {};
io.on("connection", (socket) => {
    //User specific connection
    socket.on('join', function (data) {
        socket.join(data.name);
        clients[socket.id] = data.name;
        //socket.broadcast.emit() will only broadcast to the current "connection", io.sockets.emit will broadcast to all the clients
        io.sockets.emit("onlineUsers", clients);
    });
    //console.log("Socket is connected...");
    socket.on("chat", function(data) {
        io.to(data.toName).to(data.fromName).emit("received", { message: data.message, toName: data.toName, fromName: data.fromName  });        
    });    
    socket.on("typing", data => {
        socket.broadcast.to(data.toName).emit("notifyTyping", { fromName: data.fromName, message: data.message }); 
    }); 
    //when someone stops typing
    socket.on("stopTyping", data => { console.log("stopTyping--"+data.toName); socket.broadcast.to(data.toName).emit("notifyStopTyping"); });         
    //disconnected client
    socket.on('disconnect', function(){
        delete clients[socket.id];
        //socket.broadcast.emit() will only broadcast to the current "connection", io.sockets.emit will broadcast to all the clients
        io.sockets.emit("onlineUsers", clients);
    });
});

var server = http.listen(process.env.PORT || 1330, () => {
    console.log("Now I am listening on ", server.address().port);
});
