'use strict';

import angular from 'angular';
import VideosService from './services/videos.service';
import VpValidateGreaterThan from './directives/vp-validate-greater-than.directive';
import localStorage from 'angular-local-storage';

const commonModule = angular
  .module('videoPlayerApp.common', [localStorage])
  .service('VideosService', VideosService)
  .directive('vpValidateGreaterThan', VpValidateGreaterThan);

export default commonModule.name;
