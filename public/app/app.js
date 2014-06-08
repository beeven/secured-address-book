/**
 * Created by beeven on 1/6/14.
 */

define([
    'angular',
    'angularRoute',
    'angularResource',
    'uiBootstrap',
    'bootstrap',
    './modules/departments/index'
],function(angular,ngRoute){

    "use strict";

    var app = angular.module('app',[
        'ngResource',
        'ngRoute',
        'ui.bootstrap',
        'app.departments'
    ]);
     app.config(['$routeProvider',function($routeProvider){
            $routeProvider
                .when('/departments',{templateUrl:'/app/modules/departments/departments.html'})
                //.when('/department/:dept',{templateUrl:'partials/singleDepartment.html',controller:'SingleDeptCtrl'})
                //.when('/search/:keyword',{templateUrl:'partials/search.html',controller:'SearchCtrl'})
                //.when('/detail/:id',{templateUrl:'partials/detail.html',controller:'DetailCtrl'})
                .otherwise({redirectTo:'/departments'});
        }]);

    return app;
});


