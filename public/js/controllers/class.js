/**
 * Dashboard Controller
 */

angular.module('RDash')
    .controller('ClassCtrl', ['$scope','$stateParams','Noobs', 'Class', ClassCtrl]);

function ClassCtrl($scope, $stateParams, Noobs, Class) {
    $scope.loading = true;    
    /**
     * Classes
     */
    Class.getClass($stateParams.classID)
        .success(function(data) {
            console.info(data)
            $scope.course = data.course;
            $scope.nerd = data.nerd;

            //extend class model
            $scope.course.startTime = {
                timeTo : moment(data.when).fromNow(),
                date : moment(data.when).format('DD.MM.YYYY'),
                hours : moment(data.when).format('HH:mm')
            }
            $scope.loading = false;    
        });

    $scope.submitName = function(){
        //push meber into members
        var obj = {email: this.attendeeName, class_id: $stateParams.classID};
        Class.postMember(obj).success(function(data){
            console.log(data);
            $scope.course.members.push({noob_name :data.name, noob_id : data._id, created : new Date()});
            this.attendeeName = '';
        });
    }


    $scope.formatTime = function(time){
        return moment(time).format('DD.MM.YY HH:mm:ss');
    }
}