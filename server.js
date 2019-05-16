let express = require('express');
let app = express();
let bodyParser  = require('body-parser');
let mongoose    = require('mongoose');
global.config = require('./config/config');

mongoose.connect("mongodb+srv://khasim:12345@cluster0-mglvd.mongodb.net/backend?retryWrites=true", { useNewUrlParser: true });
app.use(bodyParser.json());

/* CORS */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(require('./controllers'));

app.listen(1330, function(){
    console.log('App running on 1330');
});
