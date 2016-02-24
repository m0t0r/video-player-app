'use strict';

import template from './vp-videos-page.html';

class VpVideosPageCtrl {

  constructor(VideosService) {
    this.VideosService = VideosService;
    this.videos = [];
  }

  $onInit() {
    this.videos = this.VideosService.getVideos();
    // select first video item by default
    if (this.videos.length) {
      this.selectedVideo = this.videos[0];
      this.selectedVideoIndex = 0;
    }
  };
}

VpVideosPageCtrl.$inject = ['VideosService'];

let VpVideosPageComponent = {
  template,
  controller: VpVideosPageCtrl
};

export default VpVideosPageComponent;
