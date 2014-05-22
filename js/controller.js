var volunteerapp = angular.module('volunteerapp', []);

volunteerapp.controller('VolunteerController', function ($scope, $http) {
	$http.get('api/volunteers')
		.success(function(data){
        	$scope.volunteers = data;
    	});
    $http.get('api/tags')
        .success(function(data){
            $scope.tags = data;
        });


    $scope.save = function() {
        if($scope.volunteer.id === undefined){
        	$http.post('api/volunteer/create', JSON.stringify($scope.volunteer))
        	.success(function(data){
        		$scope.volunteer.id = data.id;
        		$scope.volunteers.push($scope.volunteer);
        		$scope.volunteer = null;
        	})
            .error(function(data){
                alert('Error while saving volunteer');
            });
        }
        else{
            $http.post('api/volunteer/update', JSON.stringify($scope.volunteer))
            .success(function(data){
                $scope.volunteer = null;
            });
        }

    };

    $scope.addTag = function(tag, volunteer){
        var volunteertag = new Object();
        volunteertag.volunteerid = volunteer.id;
        volunteertag.tagid = tag.id;
        $http.post('api/volunteer/addtag', JSON.stringify(volunteertag))
        .success(function(data){
            volunteer.tags.push(tag);
        });
        
    }

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