'use strict';

import template from './vp-videos-page.html';

class VpVideosPageCtrl {

  constructor($rootScope, VideosService, $stateParams) {
    this.$rootScope = $rootScope;
    this.VideosService = VideosService;
    this.$stateParams = $stateParams;
    this.videos = [];

    $rootScope.$on('vp-add-video', () => this.loadVideosList());
  }

  $onInit() {
    if (this.$stateParams.id) {
      this.selectedVideo = this.VideosService.getVideo(parseInt(this.$stateParams.id, 10));
    } else {
      this.loadVideosList();
    }
  };

  loadVideosList() {
    this.videos = this.VideosService.getVideos();
    if (this.videos.length) {
      // select first video item by default
      this.selectedVideo = this.videos[0];
    }
  }
  
  onSelectedVideo(selectedVideo) {
    this.selectedVideo = selectedVideo;
  }

  onVideoUpdated(updatedClip) {
    this.selectedVideo = updatedClip;
    this.VideosService.updateClip(parseInt(this.$stateParams.id, 10), updatedClip);
  }
  
  onClipAdded(clip) {
    this.VideosService.addClip(parseInt(this.$stateParams.id, 10), clip);
  }
}

VpVideosPageCtrl.$inject = ['$rootScope', 'VideosService', '$stateParams'];

let VpVideosPageComponent = {
  template,
  controller: VpVideosPageCtrl
};

export default VpVideosPageComponent;
