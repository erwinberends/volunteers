var config = require('../configuration');
var https = require('https');


function createOptions(headers, method, path){
	var options = {
    	host : config.settings.azure.baseurl,
    	path : path,
    	method : method,
    	headers :  headers
	};
	return options;
}

function handleResult(res, onSuccess, onFailure){
	res.setEncoding('utf8');
	res.on('data', function(data){
		try{
			var result = JSON.parse(data);
		}
		catch(e){
			console.log(e);
			onFailure(e);
		}

		if(res.code === 400){
			onFailure(data);
		}
		else{
			onSuccess(result);
		}
	});
}

exports.createVolunteer = function createVolunteer(volunteer, onSuccess, onFailure){
	var volunteerString = JSON.stringify(volunteer);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerString.length,
  		'X-ZUMO-APPLICATION' : config.settings.azure.apikey
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
  		'X-ZUMO-APPLICATION' : config.settings.azure.apikey
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
  		'X-ZUMO-APPLICATION' : config.settings.azure.apikey
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
	var headers = {'X-ZUMO-APPLICATION' : config.settings.azure.apikey};
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
	var headers = {'X-ZUMO-APPLICATION' : config.settings.azure.apikey};

	var options = createOptions(headers, 'GET', '/tables/tag');

	var req = https.request(options, function(res) {
  		handleResult(res, onSuccess, onFailure);
	});
	
	req.on('error', function(e) {
  		onFailure(e);
	});
	req.end();
}

exports.addTag = function addTag(volunteerTag, onSuccess, onFailure){
	var volunteerTagToSend = new Object();
	volunteerTagToSend.volunteer = volunteerTag.volunteerid;
	volunteerTagToSend.tag = volunteerTag.tagid;
	var volunteerTagString = JSON.stringify(volunteerTagToSend);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerTagString.length,
  		'X-ZUMO-APPLICATION' : config.settings.azure.apikey
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

exports.removeTag = function deleteVolunteer(query, onSuccess, onFailure){
	var headers = {
  		'X-ZUMO-APPLICATION' : config.settings.azure.apikey
	};

	var options = createOptions(headers, 'DELETE', '/api/volunteertag?volunteerid=' + query.volunteerid + '&tagid=' + query.tagid)
	
	var req = https.request(options, function(res) {
		handleResult(res, onSuccess, onFailure);

	    // This never happens
	    res.on('end', function(){
	        onSuccess();
	    });
	});

	req.on('error', function(e){
		onFailure(e);
	});
	
	req.end();
}