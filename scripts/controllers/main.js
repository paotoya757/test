'use strict';

/**
 * @ngdoc function
 * @name trabajoFinalConferenciasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trabajoFinalConferenciasApp
 */
angular.module('trabajoFinalConferenciasApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // validaciones de los login...
    $scope.users = [
      { id:1 , login:"paotoya757@yopmail.com" , password:"caracoli" } ,
      { id:2 , login:"nellyvelasco@yopmail.com" , password:"caracoli" } ,
      { id:3 , login:"martinvieira@yopmail.com" , password:"caracoli" }
    ];

    $scope.currentUser = {id:"" , login:"piedadcordoba@guerrillera.co" , password:""};

  });
