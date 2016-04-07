'use strict';

import template from './vp-videos-list.html';
import './vp-videos-list.css';

class VpVideosListCtrl {

  viewDetails(video){
    this.selectedVideo = video;
    this.onSelectedVideo({video});
  }
}

let VpVideosListComponent = {
  template,
  controller: VpVideosListCtrl,
  bindings: {
    videos: '<',
    selectedVideo: '<',
    onSelectedVideo: '&'
  }
};

export default VpVideosListComponent;
