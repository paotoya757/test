'use strict';

/**
 * @ngdoc function
 * @name trabajoFinalConferenciasApp.controller:ConferencesManageCtrl
 * @description
 * # ConferencesManageCtrl
 * Controller of the trabajoFinalConferenciasApp
 */


angular.module('trabajoFinalConferenciasApp')
  .controller('ConferencesManageCtrl', ['$scope','$filter','$location','conferenceService',function ($scope,$filter,$location,conferenceService ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //-------------------------------------------------------------------------------------
    // Attributes
    //-------------------------------------------------------------------------------------

    var orderBy = $filter('orderBy');
    var favoriteFilter = $filter('favoritesFilter');

    $scope.title = "Favorite conferences";
    $scope.confService = conferenceService ;
    $scope.conferences = [] ;
    $scope.data = [];

    //--------------------------------------------------------------------------------------
    // Refresher
    //--------------------------------------------------------------------------------------
    $scope.$watch('confService.conferences', function(){
      $scope.conferences = $scope.confService.conferences ;
      $scope.editTheme = [];
      var confs = $scope.conferences;
      for ( var i = 0 ; i<confs.length ; i++){
        $scope.editTheme[i] = "";
      }

      $scope.title = "All conferences";
      $scope.dispConferences = orderBy( $scope.conferences, 'eventdatetime' , false );
      console.log('--> watch executed!');
    });

    //--------------------------------------------------------------------------------------
    // Google maps
    //--------------------------------------------------------------------------------------
    $scope.mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(41.923, 12.513),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
    var geocoder= new google.maps.Geocoder();

    $scope.markers = [];

    var createMarker = function (info){
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.lat(), info.lng())
      });
    };

    var map_geocode = function ( code ){
      geocoder.geocode( { 'address': code }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var newAddress = results[0].geometry.location;
          $scope.map.setCenter(newAddress);
          createMarker(newAddress)
        }
      });
    };

    //--------------------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------------------

    $scope.getAllConferences = function() {
      $scope.title = "All conferences";
      $scope.dispConferences = orderBy( $scope.conferences, 'eventdatetime' , false );
    };

    $scope.getFavoriteConferences = function() {
      $scope.title = "Favorite conferences";
      $scope.dispConferences  = favoriteFilter($scope.conferences);
      var confs = $scope.dispConferences;
      for( var i = 0 ; i < confs.length ; i++ ){
        map_geocode( confs[i].place );
      }
    };

    $scope.editConf = function ( conf ) {
      conferenceService.saveConference( conf );
    };

    $scope.removeConf = function ( conf ) {
      conferenceService.removeConference( conf ) ;
    };

    $scope.addConf = function () {
      $scope.newConference.eventdatetime = new Date( $scope.newConference.event ).getTime() ;
      $scope.confService.addConference( $scope.newConference ) ;
      $scope.newConference = $scope.confService.conferenceModel() ;
    };

    $scope.doSearch = function() {
      $scope.dispConferences = $filter('filter')( $scope.conferences , $scope.searchText , false );
    };

    $scope.appendTheme = function( conf , index ){
      conf.themes.push( $scope.editTheme[index] );
      $scope.editTheme[index] = "" ;
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
    };


    //-----------------------------------------------------------------
    // -- Form receivers
    //-----------------------------------------------------------------
      $scope.newConference = $scope.confService.conferenceModel() ;
      $scope.newComment = $scope.confService.commentModel() ;
      $scope.searchText  = "";
      $scope.newTheme = "";



  }])
  .filter('favoritesFilter', function(){
    return function( confList ){
      var username = $('#username-display').html();
      var list = [];
      for ( var i = 0 ; i < confList.length ; i++ ){
        var favorites = confList[i].favorites;
        for ( var j = 0 ; j < favorites.length ; j++ ){
          if ( username == favorites[j] ){
            list.push( confList[i] );
            break;
          }
        }
      }
      return list;
    };
  });
;

