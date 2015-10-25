
var mongoose = require('mongoose');

var User = mongoose.model('User', {
	user_name: String,
	email: String,
	password: String
});

var UserData = mongoose.model('UserData',{
	email: String,
	timestamp: Date,
	steps: Number,
	calorie: Number,
	sleep_hours: Number
});

module.exports = {
	User: User,
	UserData: UserData
}
