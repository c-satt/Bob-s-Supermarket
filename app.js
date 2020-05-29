/**	Group 24
 **	CS340 Final Project - Bob's Supermarket
 ** Authors: Chelsea Satterwhite and Jennifer Moon 
 ** */

//express
var express = require('express');
var app = express();

//mysql
var mysql = require('./dbcon.js');
app.set('mysql', mysql);

//handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main',});
app.engine('handlebars', handlebars.engine);
app.set("view engine", 'handlebars');

//bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.argv[2]);

//path from folder (allows us to find the javascript files?)
app.use('/static', express.static('public'));
app.use('/', express.static('public'));

//links pages with javascript
app.use('/customers', require('./customers.js'));
app.use('/sales', require('./sales.js'));
app.use('/items', require('./items.js'));
app.use('/distributors', require('./distributors.js'));

//homepage
app.get('/', function(req, res){
	res.render("home");
});

/*
//customers page
app.get('/customers', function(req, res){
	res.render("customers");
});

//sales page
app.get('/sales', function(req, res){
	res.render("sales");
});

//items page
app.get('/items', function(req, res){
	res.render("items");
});

//distributors page
app.get('/distributors', function(req, res){
	res.render("distributors")
});*/

//handles errors
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

//prints to log that page is running 
app.listen(app.get('port'), function(){
  console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
