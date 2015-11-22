var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongodb = require('./mongodb');
var validator = require("email-validator");

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
    if (validator.validate(msg)) {
      mongodb.checkUserByEmail(msg, function(res){
        if (res) {
          socket.emit('email not avaliable','Email already exist.');
        } else {
          socket.emit('email avaliable');
        }
      });
    } else {
      socket.emit('email not avaliable','Please input valid email.');
    }
  });

  socket.on('personal_data',function(msg){
    console.log("personal data : " + msg)
    mongodb.userDataUpdate(msg);
  });

  socket.on('get data', function(msg){
    // console.log(msg);
    var startDate = msg.startDate;
    var email = msg.email;
    mongodb.getData(startDate, email, function(res) {
      socket.emit('chart data', res);
      console.log(res);
    })
  });
  
    socket.on('changePWD', function(msg){
		if (validator.validate(msg.email)) {
		mongodb.checkUserByEmail(msg.email, function(res){
        if (res) {
          socket.emit('email in db','Password was reset');
		  console.log("New encrypted password: " + msg.encryptedpwd);
		  console.log("Email from app.js " + msg.email);
		  mongodb.updateUserPassword(msg.email, msg.encryptedpwd, function(res2){
			  if(res2){
				  		console.log('changing pwd');
						var nodemailer = require('./node_modules/nodemailer');
						console.log('nodemailer set');
						var transporter = nodemailer.createTransport({
							service: 'Gmail',
							auth: {
								user: 'fitappwellness@gmail.com',
								pass: 'SWENG673'
							}
						});
						var msgtext = "Hello FitApp User - your password has been reset.  Your new password is " + msg.plaintextpassword;
					
						transporter.sendMail({
						   from: "FitApp <fitappwellness@gmail.com>", // sender address
						   to: "FitApp User <" + msg.email + ">", // comma separated list of receivers
						   subject: "FitApp - Password Reset", // Subject line
						   text: msgtext // plaintext body
							}, function(error, response){
						   if(error){
							   console.log(error);
						   }else{
							   console.log("Message sent: " + response.message);
						   }
						});
				  console.log("Password Updated");
				  
			  } else {
				  console.log("Password Update Failed");
			  }
		  });
        } else {
          socket.emit('email is not in the database','Email is not in the database.  Check for typos, or sign up.');
        }
      });
    } else {
      socket.emit('email bad','Please input valid email.');
    }
	});//end changepwd
  
  //gets the trend data for the overall wellness charts
    socket.on('get trend data', function(msg){
		var startDate = msg.startDate;
		mongodb.getTrendData(startDate, function(res) {
		socket.emit('chart trend data', res);
		console.log(res);
    })
  });
});

module.exports = app;
