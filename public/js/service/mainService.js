angular.module('RDash')
    // super simple service
    // each function returns a promise object 

    .factory('Noobs', function($http) {
        return {
            get : function() {
                return $http.get('/api/noobs');
            },
            getByName : function(name){
                return $http.get('/api/noobByNaem');
            },
            create : function(noobData) {
                return $http.post('/api/noobs', noobData);
            }
        }
    })
    .factory('Class', function($http) {
        return {
            get : function() {
                return $http.get('/api/classes');
            },
            getClass : function(classID){
                return $http.get('/api/classes/' + classID);
            },
            create : function(noobData) {
                return $http.post('/api/classes', noobData);
            },
            postMember : function(member){
                return $http.post('/api/post-noob-to-class', member);
            }
        }
    })
    .factory('Nerd', function($http) {
        return {
            get : function() {
                return $http.get('/api/nerds');
            },
            create : function(noobData) {
                return $http.post('/api/nerds', noobData);
            }
        }
    });