var storage = require('./storage/azuremobileservicesstorage');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/js/*',function(req,res){
  res.sendfile(__dirname + req.path);
});

app.get('/api/volunteers', function(req, res){
	storage.loadAllVolunteers(function(volunteers){
		res.json(volunteers);	
	},
	function(e){
		res.status(500, e);
	});
});

app.post('/api/volunteer/create', function(req, res){
	storage.createVolunteer(req.body, function(volunteer){
		res.json(JSON.parse(volunteer));
	}, function(e){
		res.status(500).send(e);
	});
});

app.post('/api/volunteer/update', function(req, res){
	storage.updateVolunteer(req.body, function(volunteer){
		res.json(JSON.parse(volunteer));
	}, function(e){
		res.status(500).send(e);
	});
});

app.post('/api/volunteer/delete', function(req, res){
	storage.deleteVolunteer(req.body, function(){
		res.status(200).send();
	}, function(e){
		res.status(500).send(e);
	});
});

app.get('/api/tags', function(req, res){
	storage.loadAllTags(function(tags){
		res.json(tags);	
	},
	function(e){
		res.status(500, e);
	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
})


