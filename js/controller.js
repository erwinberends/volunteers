var volunteerapp = angular.module('volunteerapp', []);

volunteerapp.controller('VolunteerListCtrl', function ($scope, $http) {
	 $http.get('api/volunteers')
       .success(function(data){
          $scope.volunteers = data;
     });
});