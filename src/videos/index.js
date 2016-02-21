'use strict';

import angular from 'angular';
import VpVideosComponent from './components/vp-videos/vp-videos.component';
import VpVideoDetailsComponent from './components/vp-video-details/vp-video-details.component';

const videosModule = angular
  .module('videoPlayerApp.videos', [])
  .component('vpVideos', VpVideosComponent)
  .component('vpVideoDetails', VpVideoDetailsComponent);

export default videosModule.name;
