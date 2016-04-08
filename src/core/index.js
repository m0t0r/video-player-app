'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import localStorageProviderConfig from './config/local-storage-service-provider.config';

const coreModule = angular
  .module('videoPlayerApp.core', [uiRouter])
  .config(routesConfig)
  .config(localStorageProviderConfig);

  function routesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('videos', {
        abstract: true,
        url: '/videos',
        views: {
          'main': {
            template: '<vp-videos-page flex layout="row"></vp-videos-page>'
          }
        }
      }).state('videos.list', {
        url: '',
        views: {
          'content': {
            template: '<vp-videos-list videos="$ctrl.videos" selected-video="$ctrl.selectedVideo" on-selected-video="$ctrl.onSelectedVideo(video)"></vp-videos-list>'
          },
          'side': {
            template: '<vp-video-details flex layout="row" layout-fill selected-video="$ctrl.selectedVideo"></vp-video-details>'
          }
        }
      }).state('videos.clips', {
        url: '/:id/clips',
        views: {
          'content': {
            template: '<vp-video-play selected-video="$ctrl.selectedVideo" on-video-updated="$ctrl.onVideoUpdated(video)"></vp-video-play>'
          },
          'side': {
            template: '<vp-clips-list flex layout="row" layout-fill on-selected-video="$ctrl.onSelectedVideo(video)" on-clip-added="$ctrl.onClipAdded(clip)"></vp-clips-list>'
          }
        }
      });

    $urlRouterProvider.otherwise('/videos');
  }

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default  coreModule.name;