/**
 * Created by beeven on 1/6/14.
 */
define(["./module"],function(module){
   "use strict";
    module.controller("DepartmentsCtrl",["$scope","DepartmentsService",function($scope,deptSvc){
        $scope.deptList = deptSvc.query();
    }]);
});