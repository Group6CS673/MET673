var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongodb = require('../mongodb');
var nodemailer = require('../node_modules/nodemailer');

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
router.get('/nutr1', function(req, res, next) {
  res.render('nutr1.ejs', { title: 'Express' });
});
router.get('/nutr2', function(req, res, next) {
  res.render('nutr2.ejs', { title: 'Express' });
});
router.get('/nutr3', function(req, res, next) {
  res.render('nutr3.ejs', { title: 'Express' });
});
router.get('/nutr4', function(req, res, next) {
  res.render('nutr4.ejs', { title: 'Express' });
});
router.get('/nutr5', function(req, res, next) {
  res.render('nutr5.ejs', { title: 'Express' });
});
router.get('/exercise', function(req, res, next) {
  res.render('exercise.ejs', { title: 'Express' });
});
router.get('/exerc1', function(req, res, next) {
  res.render('exerc1.ejs', { title: 'Express' });
});
router.get('/exerc2', function(req, res, next) {
  res.render('exerc2.ejs', { title: 'Express' });
});
router.get('/exerc3', function(req, res, next) {
  res.render('exerc3.ejs', { title: 'Express' });
});
router.get('/exerc4', function(req, res, next) {
  res.render('exerc4.ejs', { title: 'Express' });
});
router.get('/exerc5', function(req, res, next) {
  res.render('exerc5.ejs', { title: 'Express' });
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
router.get('/gyms', function(req, res, next) {
  res.render('gyms.ejs', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact.ejs', { title: 'Express' });
});
router.get('/forgotpwd', function(req, res, next) {
  res.render('forgotpwd.ejs', { title: 'Express' });
});
router.get('/trends', function(req, res, next) {
  res.render('trends.ejs', { title: 'Express' });
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
