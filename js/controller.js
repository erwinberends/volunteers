var volunteerapp = angular.module('volunteerapp', []);

volunteerapp.controller('VolunteerController', function ($scope, $http) {
	$http.get('api/volunteers')
		.success(function(data){
        	$scope.volunteers = data;
    	});

    $scope.save = function() {
    	$http.post('api/volunteer/create', JSON.stringify($scope.volunteer))
    	.success(function(data){
    		$scope.volunteers.push($scope.volunteer);
    	});
    };
});