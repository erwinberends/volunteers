var https = require('https');

var applicationKey = 'aqvTfJISTYrMBsmTwAWisPBZelqKLC24';
var baseUrl = 'vrijwilligersadministratie.azure-mobile.net';

function createOptions(headers, method, path){
	var options = {
    	host : baseUrl,
    	path : path,
    	method : method,
    	headers :  headers
	};
	return options;
}

function handleResult(res, onSuccess, onFailure){
	res.setEncoding('utf8');
	res.on('data', function(data){
		var result = JSON.parse(data);
		if(result.code === 400){
			onFailure(data);
		}
		else{
			console.log(data);
			onSuccess(result);
		}
	});
}

exports.createVolunteer = function createVolunteer(volunteer, onSuccess, onFailure){
	var volunteerString = JSON.stringify(volunteer);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerString.length,
  		'X-ZUMO-APPLICATION' : applicationKey
	};

	var options = createOptions(headers, 'POST', '/tables/volunteer');
	
	var req = https.request(options, function(res) {
		handleResult(res, onSuccess, onFailure);
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

	var options = createOptions(headers, 'PATCH', '/tables/volunteer/' + volunteer.id);
	
	var req = https.request(options, function(res) {
		handleResult(res, onSuccess, onFailure);
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

	var options = createOptions(headers, 'DELETE', '/tables/volunteer/' + volunteer.id)
	
	var req = https.request(options, function(res) {
		handleResult(res, onSuccess, onFailure);

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
	var headers = {'X-ZUMO-APPLICATION' : applicationKey};

	var options = createOptions(headers, 'GET', '/api/volunteers');

	var req = https.request(options, function(res) {
  		handleResult(res, onSuccess, onFailure);
	});
	
	req.on('error', function(e) {
  		onFailure(e);
	});
	req.end();
}

exports.loadAllTags = function loadAllTags(onSuccess, onFailure){
	var headers = {'X-ZUMO-APPLICATION' : applicationKey};

	var options = createOptions(headers, 'GET', '/tables/tag');

	var req = https.request(options, function(res) {
  		handleResult(res, onSuccess, onFailure);
	});
	
	req.on('error', function(e) {
  		onFailure(e);
	});
	req.end();
}

exports.addTag = function AddTag(volunteerTag, onSuccess, onFailure){
	var volunteerTagToSend = new Object();
	volunteerTagToSend.volunteer = volunteerTag.volunteerid;
	volunteerTagToSend.tag = volunteerTag.tagid;
	var volunteerTagString = JSON.stringify(volunteerTagToSend);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerTagString.length,
  		'X-ZUMO-APPLICATION' : applicationKey
	};

	var options = createOptions(headers, 'POST', '/tables/volunteertag');
	
	var req = https.request(options, function(res) {
		handleResult(res, onSuccess, onFailure);
	});

	req.on('error', function(e){
		onFailure(e);
	})

	req.write(volunteerTagString);
	req.end();
}