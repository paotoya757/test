'use strict';

/**
 * @ngdoc directive
 * @name trabajoFinalConferenciasApp.directive:conferenceList
 * @description
 * # conferenceList
 */
angular.module('trabajoFinalConferenciasApp')
  .directive('conferenceList', function () {
    return {
      templateUrl: 'templates/conferenceList.html',
      scope:{
        conferences:'=',
        title:'='
      },
      restrict: 'E',
      controller: function($scope,conferenceService) {

        //-------------------------------------------------------------------------------------
        // Attributes
        //-------------------------------------------------------------------------------------

        $scope.confService = conferenceService ;


        //--------------------------------------------------------------------------------------
        // Functions
        //--------------------------------------------------------------------------------------


        $scope.editConf = function ( conf ) {
         conferenceService.saveConference( conf );
        };

        $scope.removeConf = function ( conf ) {
          conferenceService.removeConference( conf ) ;
        };

        //---------------------------------------------------------------------------------------
        // DOM utils
        //---------------------------------------------------------------------------------------
        $scope.notLogged = function(){
          if( $('#username-display').html() == "" )
            return true;
          else
            return false;
        };

        $scope.changeFavorite = function ( conf ) {
          var user = $('#username-display').html();
          conf.favorites.push( user );
          conferenceService.saveConference( conf );
        };

        $scope.isChecked = function ( conf ) {
          var user = $('#username-display').html();
          var favs = conf.favorites;
          for( var i = 0 ; i < favs.length ; i++ ){
            if ( favs[i] == user ){
              return true;
            }
          }
          return false;
        }
      }
    };
  })

;
