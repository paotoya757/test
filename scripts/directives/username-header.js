'use strict';

/**
 * @ngdoc directive
 * @name trabajoFinalConferenciasApp.directive:usernameHeader
 * @description
 * # usernameHeader
 */
angular.module('trabajoFinalConferenciasApp')
  .directive('usernameHeader', function () {
    return {
      template: "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"
                  + "<span class='glyphicon glyphicon-user' aria-hidden='true'></span> <b>{{currentUser.login}}</b> </button>"
      ,
      scope: {
        currentUser:"="
      },
      restrict: 'E',
      controller: function ($scope) {
        console.log($scope.currentUser);
      }
    };
  });
