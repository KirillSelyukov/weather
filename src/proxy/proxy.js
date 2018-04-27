var express = require('express'),
    request = require('request');

var app = express();

app.use('', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    req.pipe(request("http://localhost:8080" + req.url)).pipe(res);
});

app.listen(3333, function () {
    console.log(`listening on port 3333`);
});