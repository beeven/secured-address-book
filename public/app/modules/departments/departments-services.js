/**
 * Created by beeven on 1/6/14.
 */
define(["./module"],function(module){
    "use strict";
    module.factory("DepartmentsService",['$resource',function($resource){
        return $resource("/api/departments/:deptId",null,{

        });
    }]);

});