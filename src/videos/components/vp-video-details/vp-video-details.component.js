'use strict';

import template from './vp-video-details.html';
import './vp-video-details.css';

class VpVideoDetailsCtrl {

}

VpVideoDetailsCtrl.$inject = ['VideosService'];

let VpVideoDetailsComponent = {
  template,
  controller: VpVideoDetailsCtrl,
  bindings: {
    selectedVideo: '<'
  }
};

export default VpVideoDetailsComponent;
