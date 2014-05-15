var express = require('express');
var https = require('https');
var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get("/js/*",function(req,res){
  res.sendfile(__dirname + req.path);
});

app.get('/api/volunteers', function(req, res){
	loadVolunteers(function(volunteers){
		res.json(volunteers);	
	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
})

function loadVolunteers(callback){
	var options = {
    	host : 'vrijwilligersadministratie.azure-mobile.net',
    	path : '/tables/volunteer',
    	method : 'GET',
    	headers :  {'X-ZUMO-APPLICATION' : 'aqvTfJISTYrMBsmTwAWisPBZelqKLC24'}
	};
	var volunteers;

	var req = https.request(options, function(res) {
  		console.log("statusCode: ", res.statusCode);
  		console.log("headers: ", res.headers);

  		res.on('data', function(data) {
    		process.stdout.write(data);
    		callback(JSON.parse(data));
  		});
	});
	req.end();

	req.on('error', function(e) {
  		console.error(e);
	});

};