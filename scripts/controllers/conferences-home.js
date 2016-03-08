'use strict';

/**
 * @ngdoc function
 * @name trabajoFinalConferenciasApp.controller:ConferencesHomeCtrl
 * @description
 * # ConferencesHomeCtrl
 * Controller of the trabajoFinalConferenciasApp
 */
angular.module('trabajoFinalConferenciasApp')
  .controller('ConferencesHomeCtrl',['$scope', '$location', '$firebaseArray' , 'conferenceService' ,
    function ( $scope, $location, $firebaseArray , conferenceService ) {

      this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.title = "Next Conferences";
    $scope.hide =  "true" ;

    // ----------------------------------------------------------------------------------------------------------------
    // ---------------------------------- Login management segment ----------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------
    var refUsers = new Firebase( 'https://incandescent-heat-3185.firebaseio.com/Users' );
    $scope.users = $firebaseArray( refUsers );
    $scope.tempUser = { email:"" ,password:"" };

    $scope.login = function(){
      for( var i = 0 ; i < $scope.users.length ; i++ ){
        if ( $scope.tempUser.email == $scope.users[i].email &&  $scope.tempUser.password == $scope.users[i].password )
        {
          $scope.currentUser = $scope.users[i];

          var disp = document.getElementById('username-display');
          disp.innerHTML = $scope.currentUser.email;
          disp.title = $scope.currentUser.id ;

          $location.path('/conferences-manage');
        }
      }

    };

    // -----------------------------------------------------------------------
    // --> end login management

      $scope.confService = conferenceService ;
      $scope.$watch('confService.conferences', function(){
        $scope.conferences = $scope.confService.conferences ;
      });



  }]);
