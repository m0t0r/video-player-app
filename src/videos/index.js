'use strict';

import angular from 'angular';
import VpVideosComponent from './components/vp-videos/vp-videos.component';

const videosModule = angular
  .module('videoPlayerApp.videos', [])
  .component('vpVideos', VpVideosComponent);

export default videosModule.name;
