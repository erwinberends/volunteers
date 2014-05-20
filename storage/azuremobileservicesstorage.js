var https = require('https');

var applicationKey = 'aqvTfJISTYrMBsmTwAWisPBZelqKLC24';
var baseUrl = 'vrijwilligersadministratie.azure-mobile.net';
exports.createVolunteer = function createVolunteer(volunteer, onSuccess, onFailure){
	var volunteerString = JSON.stringify(volunteer);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerString.length,
  		'X-ZUMO-APPLICATION' : applicationKey
	};

	var options = {
    	host : baseUrl,
    	path : '/tables/volunteer',
    	method : 'POST',
    	headers :  headers
	};
	
	var req = https.request(options, function(res) {
		res.on('data', function(data){
			onSuccess(data);
		});
	});

	req.on('error', function(e){
		onFailure(e);
	})

	req.write(volunteerString);
	req.end();
}

exports.updateVolunteer = function updateVolunteer(volunteer, onSuccess, onFailure){
	var volunteerToUpdate = volunteer;
	delete volunteerToUpdate.$$hashKey
	var volunteerString = JSON.stringify(volunteerToUpdate);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerString.length,
  		'X-ZUMO-APPLICATION' : applicationKey
	};

	var options = {
    	host : baseUrl,
    	path : '/tables/volunteer/' + volunteer.id,
    	method : 'PATCH',
    	headers :  headers
	};
	
	var req = https.request(options, function(res) {
		res.on('data', function(data){
			onSuccess(data);
		});
	});

	req.on('error', function(e){
		onFailure(e);
	})

	req.write(volunteerString);
	req.end();
}

exports.deleteVolunteer = function deleteVolunteer(volunteer, onSuccess, onFailure){
	var headers = {
  		'X-ZUMO-APPLICATION' : applicationKey
	};

	var options = {
    	host : baseUrl,
    	path : '/tables/volunteer/' + volunteer.id,
    	method : 'DELETE',
    	headers :  headers
	};
	
	var req = https.request(options, function(res) {
		var response = "";
    	res.setEncoding('utf8');

	    res.on('data', function(chunk){
	        console.log("INFO: "+chunk);
	        response += chunk;
	    });

	    // This never happens
	    res.on('end', function(){
	        console.log("End received!");
	        onSuccess();
	    });
	});

	req.on('error', function(e){
		onFailure(e);
	});
	req.end();
}

exports.loadAllVolunteers = function loadAllVolunteers(onSuccess, onFailure){
	var options = {
    	host : baseUrl,
    	path : '/tables/volunteer',
    	method : 'GET',
    	headers :  {'X-ZUMO-APPLICATION' : 'aqvTfJISTYrMBsmTwAWisPBZelqKLC24'}
	};
	var volunteers;

	var req = https.request(options, function(res) {
  		res.on('data', function(data) {
    		onSuccess(JSON.parse(data));
  		});
	});
	req.end();

	req.on('error', function(e) {
  		onFailure(e);
	});
};