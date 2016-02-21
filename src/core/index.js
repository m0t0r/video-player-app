'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

const coreModule = angular
  .module('videoPlayerApp.core', [uiRouter])
  .config(routesConfig);

  function routesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('videos', {
        url: '/videos',
        views: {
          'main': {
            template: '<vp-videos selected-video="$ctrl.selectedVideo"></vp-videos>'
          },
          'side': {
            template: '<vp-video-details selected-video="$ctrl.selectedVideo"></vp-video-details>'
          }
        }
      }).state('clips', {
        url: '/videos/:id/clips',
        views: {
          'main': {
            template: '<h3>Video</h3>'
          },
          'side': {
            template: '<h3>Clips list</h3>'
          }
        }
      });

    $urlRouterProvider.otherwise('/videos');
  }

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default  coreModule.name;