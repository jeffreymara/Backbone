var express = require('express');
var bodyParser = require('body-parser'); //npm install --save body-parser multer
var multer = require('multer');
var upload = multer(); 
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('assets'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data

app.get('/', function(req, res){
	var user_id = req.query.get_id;
    res.render('index', {
		name:"Welcome to Practice 2",
		user_id:user_id
	});
});

app.get('/login', function(req, res){
    res.render('login', {
		name:"Log In"
	});
});

app.get('/signup', function(req, res){
    res.render('Sign Up', {
		name:"Create an Account"
	});
});

app.get('/things/:name/:id', function(req, res){
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name+" there should be nothing here");
});

app.post('/post-times-two', function(req, res){
	var number = req.body.number;
	number = parseFloat(number);
	number = number*2;
	res.send(number.toString());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})