'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

const coreModule = angular
  .module('videoPlayerApp.core', [uiRouter])
  .config(routesConfig);

  function routesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('videos', {
        abstract: true,
        url: '/videos',
        views: {
          'main': {
            template: '<vp-videos-page layout="row"></vp-videos-page>'
          }
        }
      }).state('videos.list', {
        url: '',
        views: {
          'content': {
            template: '<vp-videos-list videos="$ctrl.videos" selected-video="$ctrl.selectedVideo"></vp-videos-list>'
          },
          'side': {
            template: '<vp-video-details selected-video="$ctrl.selectedVideo"></vp-video-details>'
          }
        }
      });

      //.state('clips', {
      //  url: '/videos/:id/clips',
      //  views: {
      //    'main': {
      //      template: '<vp-video-play></vp-video-play>'
      //    },
      //    'side': {
      //      template: '<vp-clips-list></vp-clips-list>'
      //    }
      //  }
      //});

    $urlRouterProvider.otherwise('/videos');
  }

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default  coreModule.name;