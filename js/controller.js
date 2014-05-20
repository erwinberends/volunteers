var volunteerapp = angular.module('volunteerapp', []);

volunteerapp.controller('VolunteerController', function ($scope, $http) {
	$http.get('api/volunteers')
		.success(function(data){
        	$scope.volunteers = data;
    	});

    $scope.save = function() {
        if($scope.volunteer.id === undefined){
        	$http.post('api/volunteer/create', JSON.stringify($scope.volunteer))
        	.success(function(data){
        		$scope.volunteer.id = data.id;
        		$scope.volunteers.push($scope.volunteer);
        		$scope.volunteer = null;
        	});
        }
        else{
            $http.post('api/volunteer/update', JSON.stringify($scope.volunteer))
            .success(function(data){
                $scope.volunteer = null;
            });
        }

    };

    $scope.editVolunteer = function(volunteer){
        $scope.volunteer = volunteer; 
    }

    $scope.deleteVolunteer = function(volunteer){
        $http.post('api/volunteer/delete', JSON.stringify(volunteer))
        .success(function(data){
            var index=$scope.volunteers.indexOf(volunteer);
            $scope.volunteers.splice(index,1);     
        });
    }
});