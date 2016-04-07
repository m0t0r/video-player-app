'use strict';

import template from './vp-videos-page.html';

class VpVideosPageCtrl {

  constructor($rootScope, VideosService) {
    this.$rootScope = $rootScope;
    this.VideosService = VideosService;
    this.videos = [];

    $rootScope.$on('vp-add-video', () => this.loadVideosList());
  }

  $onInit() {
    this.loadVideosList();
  };

  loadVideosList() {
    this.videos = this.VideosService.getVideos();
    // select first video item by default
    if (this.videos.length) {
      this.selectedVideo = this.videos[0];
      this.selectedVideoIndex = 0;
    }
  }
  
  onSelectedVideo(selectedVideo) {
    this.selectedVideo = selectedVideo;
  }
}

VpVideosPageCtrl.$inject = ['$rootScope', 'VideosService'];

let VpVideosPageComponent = {
  template,
  controller: VpVideosPageCtrl
};

export default VpVideosPageComponent;
