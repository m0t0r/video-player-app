'use strict';

import angular from 'angular';
import VideosService from './services/videos.service';

const commonModule = angular
  .module('videoPlayerApp.common', [])
  .service('VideosService', VideosService);

export default commonModule.name;
