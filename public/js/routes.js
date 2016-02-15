'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('noob-board', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                controller: "DashboardCtrl"
            })
            .state('class', {
                url: '/class/:classID',
                templateUrl: 'templates/class.html',
                controller: "ClassCtrl"
            })
            .state('nerds', {
                url: '/nerds',
                templateUrl: 'templates/nerds.html',
                controller: "NerdCtrl"
            });
    }
]);