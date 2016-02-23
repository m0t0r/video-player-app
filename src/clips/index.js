'use strict';

import angular from 'angular';
import VpClipsListComponent from './components/vp-clips-list/vp-clips-list.component';

const clipsModule = angular
  .module('videoPlayerApp.clips', [])
  .component('vpClipsList', VpClipsListComponent);

export default clipsModule.name;
