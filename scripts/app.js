'use strict';

/**
 * @ngdoc overview
 * @name trabajoFinalConferenciasApp
 * @description
 * # trabajoFinalConferenciasApp
 *
 * Main module of the application.
 */
var conferenceApp = angular
  .module('trabajoFinalConferenciasApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider

      .when('/conferences-home', {
        templateUrl: 'vistas/conferences-home.html',
        controller: 'ConferencesHomeCtrl',
        controllerAs: 'conferencesHome'
      })
      .when('/conferences-manage', {
        templateUrl: 'views/conferences-manage.html',
        controller: 'ConferencesManageCtrl',
        controllerAs: 'conferencesManage'
      })
      .when('/conferences/:id', {
        templateUrl: 'views/single-conference.html',
        controller: 'SingleConferenceCtrl',
        controllerAs: 'singleConference'
      })
      .otherwise({
        redirectTo: '/conferences-home'
      });
  })
  ;


//---------------------------------------------------------------------------
// Filtros
//---------------------------------------------------------------------------
