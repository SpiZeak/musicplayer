var express = require('express');
var app = express();
var path = require('path');
var opn = require('opn');

app.use(express.static('public'));
app.listen(3000, function () {
  console.log('Server started at http://localhost:3000');
});

opn('http://localhost:3000');
