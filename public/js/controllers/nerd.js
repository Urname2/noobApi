/**
 * Nerds Controller
 */

angular.module('RDash')
    .controller('NerdCtrl', ['$scope','Nerd', NerdCtrl]);

function NerdCtrl($scope, Nerd) {
	$scope.loading = true;
    /**
     * get Nerds
     */
    Nerd.get()
        .success(function(data) {
            $scope.nerds = data;
            $scope.loading = false;
        });

}