var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongodb = require('./mongodb');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var routes = require('./routes/index');
app.use('/', routes);
// app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

mongodb.initializeDB();

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user left');
  });

  socket.on('createNewUser', function(user_info){
    mongodb.createUser(user_info);
  });

  socket.on('check user', function(user_info) {
    mongodb.checkUser(user_info, function(res){
      if (res) {
        socket.emit('user verified');
      } else {
        socket.emit('user verification failed');
      }
    });
  });

  socket.on('checkUserByEmail', function(msg) {
    mongodb.checkUserByEmail(msg, function(res){
      if (res) {
        socket.emit('email not avaliable');
      } else {
        socket.emit('email avaliable');
      }
    });
  });

  socket.on('personal_data',function(msg){
    mongodb.userDataUpdate(msg);
  });
});

module.exports = app;
