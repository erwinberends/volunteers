var https = require('https');

exports.createVolunteer = function createVolunteer(volunteer, callback){

	var volunteerString = JSON.stringify(volunteer);

	var headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': volunteerString.length,
  		'X-ZUMO-APPLICATION' : 'aqvTfJISTYrMBsmTwAWisPBZelqKLC24'
	};

	var options = {
    	host : 'vrijwilligersadministratie.azure-mobile.net',
    	path : '/tables/volunteer',
    	method : 'POST',
    	headers :  headers
	};
	
	var req = https.request(options, function(res) {
	});

	req.write(volunteerString);
	req.end();
}

exports.loadAllVolunteers = function loadAllVolunteers(callback){
	var options = {
    	host : 'vrijwilligersadministratie.azure-mobile.net',
    	path : '/tables/volunteer',
    	method : 'GET',
    	headers :  {'X-ZUMO-APPLICATION' : 'aqvTfJISTYrMBsmTwAWisPBZelqKLC24'}
	};
	var volunteers;

	var req = https.request(options, function(res) {
  		res.on('data', function(data) {
    		callback(JSON.parse(data));
  		});
	});
	req.end();

	req.on('error', function(e) {
  		console.error(e);
	});
};