var volunteerapp = angular.module('volunteerapp', []);

volunteerapp.controller('VolunteerController', function ($scope, $http) {
	$http.get('api/volunteers')
		.success(function(data){
        	$scope.volunteers = data;
    	});

    $scope.update = function(volunteer) {
    	$http.post('api/volunteer/create', JSON.stringify(volunteer));
    };
});