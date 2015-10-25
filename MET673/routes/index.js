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

router.post('/personal',urlencodedParser, function(request,response){
  mongodb.checkUserByEmail(request.body.email, function(res) {
    request.flash('user_name', res.user_name);
    response.render('personal',{ user_name: res.user_name });
  })
});
router.post('/myFile', urlencodedParser,function(req, res, next) {
  res.render('myFile', { user_name: req.flash('user_name') });
});
router.get('/updateData', function(req, res, next) {
  res.render('updateData', { title: 'Express' });
});


module.exports = router;
