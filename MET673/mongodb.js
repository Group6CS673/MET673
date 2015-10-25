var mongoose = require('mongoose');
var user = require('./models/user');

var User = user.User;
var UserData = user.UserData;

// Specified db name from CLI
var dbName = process.argv[3];

module.exports = {
  // Initialize MongoDB connection with specified DB
  initializeDB: function() {
    mongoose.connect('mongodb://localhost/' + dbName);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '... connection error ...'));
    db.once('open', function callback() {
      console.info("... db open ...");
    });
  },
  createUser: function(user_info) {
    var user = new User({
      user_name: user_info.username,
      email: user_info.email,
      password: user_info.password
    });
    user.save(function(err) {
      if (err) return handleError(err);
      else {
        console.log('Updated', user);
      }
    });
  },
  // Store Mote Data
  userDataUpdate: function(user_data) {
    var userNewData = new UserData({
      email: user_data.email,
      timestamp: new Date(),
      steps: user_data.steps,
      calorie: user_data.calorie,
      sleep_hours: user_data.sleep_hours
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
  // Retrieve a single Mote from start - end
  retrieveMote: function(mote, start, end, callback) {
    Motes.find({
      timestamp: {
        $gte: start,
        $lte: end
      },
      identity: mote
    })
    .select('timestamp kelvin fahrenheit celsius')
    .sort('timestamp')
    .exec(function(err, results) {
      if (err) { console.log(err); }
      else {
        // console.log(results);
        callback(results);
      }
    });
  },

  // Retrieve averages from start - end
  retrieveAverages: function(start, end, callback) {
    Averages.find({
      timestamp: {
        $gte: start,
        $lte: end
      }
    })
    .select('timestamp identity kelvin fahrenheit celsius')
    .sort('timestamp')
    .exec(function(err, results) {
      if (err) { console.log(err); }
      else {
        // console.log(results);
        callback(results);
      }
    });
  },

   getDistinctMotes: function(callback) {
     Motes.find()
     .distinct('identity')
     .exec(function(err, results) {
       if (err) { console.log(err); }
       else {
        //  console.log(results);
         callback(results); }
     });
   }

 }
