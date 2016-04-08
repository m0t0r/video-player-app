'use strict';

import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import common from '../common';
import uiRouter from 'angular-ui-router';
import localStorageModule from 'angular-local-storage';

import VpVideosPageComponent from './components/vp-videos-page/vp-videos-page.component';
import VpVideosListComponent from './components/vp-videos-list/vp-videos-list.component';
import VpVideoDetailsComponent from './components/vp-video-details/vp-video-details.component';
import VpVideoPlayComponent from './components/vp-video-play/vp-video-play.component';
import VpClipsListComponent from './components/vp-clips-list/vp-clips-list.component';

const videosModule = angular
  .module('videoPlayerApp.videos', [ngSanitize, common, uiRouter, localStorageModule])
  .component('vpVideosPage', VpVideosPageComponent)
  .component('vpVideosList', VpVideosListComponent)
  .component('vpVideoDetails', VpVideoDetailsComponent)
  .component('vpVideoPlay', VpVideoPlayComponent)
  .component('vpClipsList', VpClipsListComponent);

export default videosModule.name;
