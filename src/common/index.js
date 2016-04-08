'use strict';

import angular from 'angular';
import VideosService from './services/videos.service';
import VpValidateGreaterThan from './directives/vp-validate-greater-than.directive';
import localStorageModule from 'angular-local-storage';

const commonModule = angular
  .module('videoPlayerApp.common', [localStorageModule])
  .service('VideosService', VideosService)
  .directive('vpValidateGreaterThan', VpValidateGreaterThan);

export default commonModule.name;
