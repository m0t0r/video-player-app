'use strict';

import angular from 'angular';
import VpVideosComponent from './components/vp-videos/vp-videos.component';
import VpVideoDetailsComponent from './components/vp-video-details/vp-video-details.component';
import VpVideoPlayComponent from './components/vp-video-play/vp-video-play.component';

const videosModule = angular
  .module('videoPlayerApp.videos', ['ngSanitize'])
  .component('vpVideos', VpVideosComponent)
  .component('vpVideoDetails', VpVideoDetailsComponent)
  .component('vpVideoPlay', VpVideoPlayComponent);

export default videosModule.name;
