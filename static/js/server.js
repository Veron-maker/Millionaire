'use strict';
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/').slice(0, -3);
app.use(express.static(staticPath));

app.set('port', process.env.PORT || 3000);

app.get('/game.html', function (req, res) {
    res.redirect('/game')
});

app.get('/index.html', function (req, res) {
    res.redirect('/');
});

app.get('/rules.html', function (req, res)
{
    res.redirect('/rules');
});

app.get('/', function (req, res) {
    res.sendFile(staticPath + 'html/index.html');
});

app.get('/game', function (req, res){
    res.sendFile(staticPath + 'html/game.html');
})

app.get('/rules', function (req, res)
{
    res.sendFile(staticPath + 'html/rules.html');
})

app.listen(app.get('port'), function () {
    console.log('listening');
});