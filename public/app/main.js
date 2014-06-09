/**
 * Created by beeven on 1/6/14.
 */

require.config({
    baseUrl: '/app',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        angular: '../bower_components/angular/angular.min',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        angularResource: '../bower_components/angular-resource/angular-resource.min',
        angularTouch: '../bower_components/angular-touch/angular-touch.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        uiBootstrap: '../bower_components/angular-ui-bootstrap-bower/ui-bootstrap.min',
        uiBootstrapTpls: '../bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min',
        uiUtils: '../bower_components/angular-ui-utils/ui-utils.min'
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular'],
            exports: 'angularRoute'
        },
        angularResource: {
            deps: ['angular'],
            exports: 'angularResource'
        },
        uiBootstrap: {
            deps: ['angular'],
            exports: 'uiBootstrap'
        },
        uiUtils: {
            deps: ['angular'],
            expports: 'uiUtils'
        },
        angularTouch: {
            deps: ['angular'],
            exports: 'angularTouch'
        },
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps:['jquery'],
            exports: 'bootstrap'
        }
    },
    out: "integrated.js"
});

require(['jquery','angular','./app'],function($,angular){
    $(function(){
        angular.bootstrap(document,['app'])
    });
});