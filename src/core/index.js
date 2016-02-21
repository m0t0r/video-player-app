'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

let coreModule = angular
  .module('videoPlayerApp.core', [uiRouter])
  .config(routesConfig);

  function routesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('videos', {
        url: '/videos',
        views: {
          'main': {
            template: '<h1>Videos list</h1>'
          }
        }
      });

    $urlRouterProvider.otherwise('/videos');
  }

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default  coreModule.name;