var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get("/js/*",function(req,res){
  res.sendfile(__dirname + req.path);
});

app.get('/api/volunteers', function(req, res){
	var volunteers = getVolunteers();
	res.json(volunteers);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
})

function getVolunteers(){
	return [new Volunteer('Erwin', 'Berends', 'erwin@taiga.nl'),
			new Volunteer('Denise', 'Elizen', 'denise_elizen@hotmail.com')];
}

function Volunteer(firstName, lastName, email){
	this.FirstName = firstName;
	this.LastName = lastName;
	this.EMail = email;
}