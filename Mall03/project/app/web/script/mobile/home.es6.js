'use strict';

// angular
//-----------------------------------------------------------------

var app = angular.module("home", ['ngRoute']);

// 路由注册
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // 列表页路由
    .when('/', {
        //templateUrl: 'admin/shops/shops_list.html',
        //controller: 'ViewController'
    });
}]);
//控制器
app.controller('NavController', function ($scope) {
    $scope.snap = function () {
        alert("跳转至抢购页面");
    };
});