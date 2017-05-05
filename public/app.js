angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'ngDraggable'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
});