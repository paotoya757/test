'use strict';

/**
 * @ngdoc directive
 * @name trabajoFinalConferenciasApp.directive:markasFavoriteBtn
 * @description
 * # markasFavoriteBtn
 */
angular.module('trabajoFinalConferenciasApp')
  .directive('markasFavoriteBtn', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the markasFavoriteBtn directive');
      }
    };
  });
