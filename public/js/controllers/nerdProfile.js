//NerdProfile

angular.module('RDash')
    .controller('NerdProfile', ['$scope','$stateParams', '$timeout', NerdProfile]);

function NerdProfile($scope, $stateParams, $timeout) {
    $scope.loading = true;
    /**
     * Nerds
     */

    $timeout(function() {
        console.info($stateParams)
        $scope.loading = false; 
    }, 1000);
    
    //using moment.js to format time
    $scope.formatTime = function(time){
        return moment(time).format('DD.MM.YY HH:mm:ss');
    }
}
