var storage = require('./storage/azuremobileservicesstorage');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get("/js/*",function(req,res){
  res.sendfile(__dirname + req.path);
});

app.get('/api/volunteers', function(req, res){
	storage.loadAllVolunteers(function(volunteers){
		res.json(volunteers);	
	});
});

app.use(bodyParser.json());

app.post('/api/volunteer/create', function(req, res){
	storage.createVolunteer(req.body);
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
})


