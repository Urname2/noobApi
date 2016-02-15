/**
 * Dashboard Controller
 */

angular.module('RDash')
    .controller('DashboardCtrl', ['$scope','Noobs', 'Class', DashboardCtrl]);

function DashboardCtrl($scope, Noobs, Class) {
    $scope.eValid = false;
    $scope.nameValid = false;
    $scope.showMessage = false;

    $scope.emailMessage = function(){
        if($scope.eValid)
            $scope.showMessage = false;
        else
            $scope.showMessage = true;
    }
    /**
     * Noobs
     */
    Noobs.get()
        .success(function(data) {
            $scope.noobs = data;
        });


    $scope.formatTime = function(time){
        return moment(time).format('DD.MM.YYYY HH:mm');
    }

    /**
     * Classes
     */
    Class.get()
        .success(function(data) {
            $scope.courses = data;
        });

    $scope.emailChecker = function(email){
        if(/@soprasteria.com\s*$/.test(email)){
            $scope.eValid = true;
        }
        else{
            $scope.eValid = false;
        }

    }

    $scope.nameChecker = function(text){
        text = text ? text : '';

        if(text.length >= 2){
            $scope.nameValid = true;
        }
        else{
            $scope.nameValid = false;
        }
    }

    $scope.validation = function(checker){
        if(checker === true)
            return "success";
         else
             return "danger";
    }

    $scope.validationIcon = function(checker){
        if(checker === true)
            return "glyphicon-ok";
         else
             return "glyphicon-remove";
    }

    $scope.validUser = function(mail, name){
        if(mail && name)
            return 'btn-primary';
        else
            return 'btn-default';
    }

    $scope.createUser = function(mail, name){
        $scope.creating = true;
        $scope.showErrorMessage = false;
        if($scope.eValid, $scope.nameValid){
            
            var form = this;
            //model
            $scope.regData = {
                email: mail,
                name : name
            };

            //create a noob on server
            Noobs.create($scope.regData)
                .success(function(data) {
                    $scope.creating = false;

                    if(data.name === "ValidationError"){
                        $scope.showErrorMessage = true;
                    }
                    else{
                        $scope.formSuccess = true;
                        localStorage.setItem('profile', JSON.stringify($scope.regData));
                        form.userName = '';
                        form.email = '';
                    }
                });
        }
        else{
            console.error('not valid input');
        }
    }
}