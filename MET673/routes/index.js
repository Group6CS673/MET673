var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongodb = require('../mongodb');

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
  res.render('homepage.ejs', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/nutrition', function(req, res, next) {
  res.render('nutrition.ejs', { title: 'Express' });
});
router.get('/heartrate', function(req, res, next) {
  res.render('heartrate.ejs', { title: 'Express' });
});
router.get('/sleep', function(req, res, next) {
  res.render('sleep.ejs', { title: 'Express' });
});
router.get('/stepcount', function(req, res, next) {
  res.render('stepcount.ejs', { title: 'Express' });
});
router.get('/calories', function(req, res, next) {
  res.render('calories.ejs', { title: 'Express' });
});

router.post('/personal',urlencodedParser, function(request,response){
  mongodb.checkUserByEmail(request.body.email, function(res) {
    response.render('personal',{ user_name: res.user_name, user_email: request.body.email});
  });
});

router.post('/updateData', urlencodedParser,function(request, response, next) {
  mongodb.checkUserByEmail(request.body.email, function(res) {
    response.render('updateData',{ user_name: res.user_name, user_email: request.body.email});
  });
});



module.exports = router;
