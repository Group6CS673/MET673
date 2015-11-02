var mongoose = require('mongoose');
var user = require('./models/user');

var User = user.User;
var UserData = user.UserData;

// Specified db name from CLI
var dbName = process.argv[2];

module.exports = {
  // Initialize MongoDB connection with specified DB
  initializeDB: function() {

    var uri = 'mongodb://SWENGUSER:CS673@ds041144.mongolab.com:41144/fitappdb';

    //mongoose.connect('mongodb://localhost/' + dbName);
    mongoose.connect(uri);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '... connection error ...'));
    db.once('open', function callback() {
      console.info("... db open ...");
      console.log("dbName is "+ dbName);
    });
  },
  createUser: function(user_info) {
    var user = new User({
      user_name: user_info.username,
      email: user_info.email,
      password: user_info.password
    });
    user.save(function(err) {
      if (err) return console.log(err);
      else {
        console.log('Updated', user);
      }
    });
  },
  // Store Mote Data
  userDataUpdate: function(user_data) {
    var date = new Date();
    var userNewData = new UserData({
      email: user_data.email,
      timestamp: date.getTime(),
      steps: user_data.steps,
      calorie: user_data.calorie,
      sleep_hours: user_data.sleep_hours,
      heart_rates: user_data.heart_rates
    });
    userNewData.save(function(err) {
      if (err) return handleError(err);
      else {
        console.log('Updated', userNewData);
      }
    });
  },

  checkUser: function(user,callback){
    User.findOne({
      email: user.email,
      password: user.password
    }).exec(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        callback(res);
      }
    });
  },

  checkUserByEmail: function(msg,callback){
    User.findOne({
      email: msg,
    }).exec(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        callback(res);
      }
    });
  },

  getData: function(startDate,callback) {
    UserData.find({
      timestamp: {$gte: new Date(startDate)}
    }).exec(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        callback(res);
      }
    });
  }
 }
