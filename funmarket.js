var searchApp = angular.module('Funmarket', ['ngResource', 'ngRoute']).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when("/", {templateUrl:"/funmarket/partials/list.html"}).
            when("/show/:id", { templateUrl:"/funmarket/partials/ad.html", controller:"ShowAddCtrl"}).
            when("/edit/:id", {templateUrl:"/funmarket/partials/edit.html", controller:"EditAddCtrl"}).
            when("/new/", {templateUrl:"/funmarket/partials/edit.html", controller:"CreateAddCtrl"}).
            when("/saved/", {templateUrl:"/funmarket/partials/saved.html"}).
            when("/delete/", {templateUrl:"/funmarket/partials/delete.html"});
    } );


searchApp.controller( 'AppCtrl', function ($scope, $resource, $rootScope) {
    $rootScope.search = $resource('http://mepa-store-api.herokuapp.com/marketads');
    $rootScope.searchResult = $rootScope.search.query();

    $scope.refresh = function() {
        $rootScope.searchResult = $rootScope.search.query();
    }
} );


searchApp.controller( 'ShowAddCtrl', function ($scope, $resource, $routeParams, $rootScope) {
    $scope.search = $resource('http://mepa-store-api.herokuapp.com/marketads/' +  $routeParams.id);
    $scope.id = $routeParams.id;
    $scope.add = $scope.search.get()
    .$promise.then(
        //success
        function( value ){
            $scope.add = value;
        },
        //error
        function( error ){
            // TODO:: do something meaningfull
        }
    );

    $scope.delete = function () {
        $scope.search.delete()
        .$promise.then(
            //success
            function( value ){
                $rootScope.searchResult = $rootScope.search.query();
            },
            //error
            function( error ){
                // TODO:: do something meaningfull
            }
        );

    }
} );


searchApp.controller( 'EditAddCtrl', function ($scope, $resource, $routeParams, $rootScope) {
    $scope.search = $resource('http://mepa-store-api.herokuapp.com/marketads/' +  $routeParams.id);
    $scope.id = $routeParams.id;
    $scope.add = $scope.search.get();

    $scope.save = function () {
        $scope.SaveResource = $resource('http://mepa-store-api.herokuapp.com/marketads');
        $scope.SaveResource.save($scope.add)
        .$promise.then(
            //success
            function( value ){
                $rootScope.searchResult = $rootScope.search.query();
            },
            //error
            function( error ){
                // TODO:: do something meaningfull
            }
        );
    }
} );


searchApp.controller( 'CreateAddCtrl', function ($scope, $resource, $routeParams, $rootScope) {
    $scope.add = {};

    $scope.save = function () {
        $scope.SaveResource = $resource('http://mepa-store-api.herokuapp.com/marketads');
        $scope.SaveResource.save($scope.add)
        .$promise.then(
            //success
            function( value ){
                $rootScope.searchResult = $rootScope.search.query();
            },
            //error
            function( error ){
                // TODO:: do something meaningfull
            }
        );
    }
} );
