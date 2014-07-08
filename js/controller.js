var volunteerapp = angular.module('volunteerapp', ['ngRoute']);

volunteerapp.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/ByTag', {
        templateUrl: 'partials/bytag.html',
      }
    )
      .when('/ByVolunteer', {
        templateUrl: 'partials/byvolunteer.html',
    })
      .otherwise({
        redirectTo: '/ByVolunteer'
      });;
  });


volunteerapp.controller('VolunteerController', function ($scope, $http) {
    var volunteersLoaded = false;
    var tagsLoaded = false;
	$http.get('api/volunteers')
		.success(function(data){
        	$scope.volunteers = data;
            volunteersLoaded = true;
            addVolunteersToTag();

    	});
    $http.get('api/tags')
        .success(function(data){
            $scope.tags = data;
            tagsLoaded = true;
            addVolunteersToTag();
        });

    function addVolunteersToTag(){
        if(volunteersLoaded && tagsLoaded){
            _.each($scope.tags, function(tag){
                tag.volunteers = new Array();
                _.each($scope.volunteers, function(volunteer){
                    _.each(volunteer.tags, function(volunteertag){
                        if(tag.id === volunteertag.id){
                            tag.volunteers.push(volunteer);
                        }
                    });
                });
            });
        }
    }

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
            if(!volunteer.tags){
                volunteer.tags = [tag]; 
            }
            else{
                volunteer.tags.push(tag);
            }
            addVolunteersToTag();
        });
        
    }

    $scope.removeTag = function(tag, volunteer){
        var query = new Object();
        query.volunteerid = volunteer.id;
        query.tagid = tag.id;
        $http.post('api/volunteer/removetag', JSON.stringify(query))
        .success(function(data){
            var index = volunteer.tags.indexOf(tag);
            if (index > -1) {
                volunteer.tags.splice(index, 1);
                addVolunteersToTag();
            }
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
        })
        .error(function(data){
                alert('Error while deleting volunteer');
        });
    }
});