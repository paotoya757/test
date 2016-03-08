'use strict';

/**
 * @ngdoc service
 * @name trabajoFinalConferenciasApp.dbService
 * @description
 * # dbService
 * Service in the trabajoFinalConferenciasApp.i
 */
angular.module('trabajoFinalConferenciasApp')
  .factory('conferenceService', ['$rootScope','$location', '$firebaseArray' , function ( $rootScope, $location, $firebaseArray ) {

    var service = { };
    service.ref = new Firebase( 'https://incandescent-heat-3185.firebaseio.com/conferences' );
    service.conferences = $firebaseArray( service.ref );
    //---------------------------------------------
    // Functions
    //---------------------------------------------

    service.addConference = function ( conf ) {
      service.conferences.$add( conf )
        .then(
          function( ref ){
              var id = ref.key();
              var addedConf = service.conferences.$getRecord(id);
              addedConf.id = id ;
              service.conferences.$save( addedConf );
              console.log("new cconference added");
          }
        );
    };

    service.saveConference = function ( conf ) {
      service.conferences.$save( conf);
    };

    service.removeConference = function( conf ){
      service.conferences.$remove( conf) ;
    };

    service.getIndex = function ( key ){
      return service.conferences.$indexFor( key);
    };

    var refresh = function(){

    };
    //------------------------------------------------
    // Models
    //------------------------------------------------
    service.conferenceModel = function () {
      return {
        id            : "",
        name          : "",
        description   : "",
        place         : "",
        deadline      : "",
        notification  : "",
        event         : "",
        eventdatetime : "",
        comments:[ service.commentModel() ],
        favorites:[ "" ],
        themes:[ "" ] // 1...n
      };
    };

    service.commentModel = function(){
      return {
        id:"",
        userid:"",
        contents:""
      };
    };



    return service;
  }]);
