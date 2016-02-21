'use strict';

import template from './vp-videos.html';
import './vp-videos.css';

class VpVideosCtrl {
  
  constructor(VideosService) {
    this.VideosService = VideosService;
    this.videos = [];
    this.selectedVideo = null;
  }

  $onInit() {
    this.videos = this.VideosService.getVideos();
    console.log(this.videos);
  };

  viewDetails(video){
    this.selectedVideo = video;
  }
}

VpVideosCtrl.$inject = ['VideosService'];

let VpVideosComponent = {
  template,
  controller: VpVideosCtrl
};

export default VpVideosComponent;
