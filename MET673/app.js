var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/personal', function(req, res) {
   res.sendFile(path.join(__dirname) + '/views/personal.html');
});

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname) + '/views/homepage.html');
});

app.get('/signup', function(req, res) {
   res.sendFile(path.join(__dirname) + '/views/signup.html');
});
app.get('/updateData', function(req, res) {
   res.sendFile(path.join(__dirname) + '/views/updateData.html');
});
app.get('/myFile', function(req, res) {
   res.sendFile(path.join(__dirname) + '/views/myFile.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
