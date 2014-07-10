var volunteerapp = angular.module('volunteerapp', ['ngRoute']);

volunteerapp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/ByTag', {
            templateUrl: 'partials/bytag.html',
        })
        .when('/ByName', {
            templateUrl: 'partials/byname.html',
        })
        .when('/', {
            templateUrl: 'partials/byname.html',
        });
  });

volunteerapp.factory("errors", function($rootScope){
    return {
        catch: function(message){
            return function(reason){
                $rootScope.showError(message);
            };
        }
    };
});

volunteerapp.config(function($provide){
    $provide.decorator("$exceptionHandler", function($delegate, $injector){
        return function(exception, cause){
            var $rootScope = $injector.get("$rootScope");
            $rootScope.showError(exception.toString());
            $delegate(exception, cause);
        };
    });
});

volunteerapp.run(function($rootScope) {
       
    $rootScope.errorOccured = false;
    $rootScope.errorMessage = '';

    $rootScope.showError = function(message){
        $rootScope.errorOccured = true;
        $rootScope.errorMessage = message;
    }

    $rootScope.dismissError = function(){
        $rootScope.errorOccured = false;
        $rootScope.errorMessage = '';
    }
});




volunteerapp.controller('VolunteerController', function ($q, $scope, $http, errors) {
    
    var volunteersLoaded = false;
    var tagsLoaded = false;
    
    $scope.volunteers = getVolunteers();
    $scope.tags = getTags();

    function getVolunteers(){
        $http.get('api/volunteers')
        .success(function(data){
            $scope.volunteers = data;
            volunteersLoaded = true;
            addVolunteersToTag();
        })
        .catch(errors.catch('Error occured while loading volunteers'));
    }

    function getTags(){
        $http.get('api/tags')
        .success(function(data){
            $scope.tags = data;
            tagsLoaded = true;
            addVolunteersToTag();
        })
        .catch(errors.catch('Error occured while loading tags'));
    }
	
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
            .catch(errors.catch('Error while saving volunteer'));
        }
        else{
            $http.post('api/volunteer/update', JSON.stringify($scope.volunteer))
            .success(function(data){
                $scope.volunteer = null;
            })
            .catch(errors.catch('Error while saving volunteer'));
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
        })
        .catch(errors.catch('Error while adding tag, tags can be added once'));
        
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
        })
        .catch(errors.catch('Error while adding tag, tags can be added once'));
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
        .catch(errors.catch('Error while adding tag, tags can be added once'));
    }

    $scope.dismissError = function(){
        $scope.errorOccured = false;
        $scope.errorMessage = '';
    }
});