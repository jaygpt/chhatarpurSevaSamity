var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
mongoose.connect('mongodb://jaygpt:Qwert12345@ds123926.mlab.com:23926/communitywelfare');

var db = mongoose.connection;
var user = require('./models/user.js');
var complain = require('./models/complain.js');

//engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs());
app.set('view engine', 'handlebars');

app.set('port', (process.env.PORT || 3000));
var server = app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
	res.redirect('/home');
})
app.get('/home',(req,res)=> {
	res.render('index');
});
app.get('/ramkumarg',(req,res)=>{
	res.render('volunteers-single');
});
app.get('/ramkumarg/listforramkumar',(req,res)=>{
	let contact = [];
	user.find()
		.then((found)=>{
			for(let i = 0; i<found.length; i++){
				contact.push(found[i]);
			}
		})
	complain.find()
		.then((found)=>{
			res.render('list',{list:contact,complain:found});
		})
	
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ramkumarg',(req,res)=>{
	var name = req.body.contact_name;
	var email = req.body.contact_email2;
	var phone = req.body.contact_subject;
	var message = req.body.msg;
	var complainz = new complain({
		name: name,
		email: email,
		phone: phone,
		message: message
	});
	complainz.save();
	res.redirect('/home');
});

app.post('/home',(req,res)=>{
	var name = req.body.name;
	var email = req.body.email;
	var phone = req.body.phone;
	var address = req.body.address;
	var message = req.body.message;
	var newUser = new user({
		name: name,
		email: email,
		phone: phone,
		address: address,
		message: message
	});
	user.findOne()
		.then((found)=>{
			if (found === undefined)
			{
				console.log('true');
			}
		})
	newUser.save();
	res.redirect('/home');
});