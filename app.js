
(function () {
  'use strict';

  // create the angular app
  angular.module('myApp', [
    'myApp.controllers',
    'myApp.directives',
    'ui.bootstrap',
    'smart-table',
    'd3'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('myApp.controllers', []);
  angular.module('myApp.directives', ['d3']);


}());
