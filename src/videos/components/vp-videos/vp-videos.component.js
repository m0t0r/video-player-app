'use strict';

import template from './vp-videos.html';
import './vp-videos.css';

class VpVideosCtrl {
  
  constructor(VideosService) {
    this.VideosService = VideosService;
    this.videos = [];
  }

  $onInit() {
    this.videos = this.VideosService.getVideos();
  };

  viewDetails(video){
    this.selectedVideo = video;
  }
}

VpVideosCtrl.$inject = ['VideosService'];

let VpVideosComponent = {
  template,
  controller: VpVideosCtrl,
  bindings: {
    selectedVideo: '='
  }
};

export default VpVideosComponent;
