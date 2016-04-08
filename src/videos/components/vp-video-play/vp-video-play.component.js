'use strict';

import template from './vp-video-play.html';
import './vp-video-play.css';

class VpVideoPlayCtrl {

  constructor($scope, $sce) {
    this.$scope = $scope;
    this.$sce = $sce;
    this.API = {};
  }

  onPlayerReady(API) {
    this.API = API;
  };

  $onInit() {
    this.config = {
      sources: this.getVideoSource(this.selectedVideo).sources,
      tracks: [
        {
          src: 'http://www.videogular.com/assets/subs/pale-blue-dot.vtt',
          kind: 'subtitles',
          srclang: 'en',
          label: 'English',
          default: ''
        }
      ],
      theme: 'node_modules/videogular-themes-default/videogular.css',
      plugins: {
        poster: 'http://www.videogular.com/assets/images/videogular.png'
      }
    };

    this.$scope.$watch('$ctrl.selectedVideo', (newVideo) => {
      if (this.API.stop()) {
        this.API.stop();
      }
      this.isEditMode = false;
      this.config.sources = this.getVideoSource(newVideo).sources;
    });
  }

  getVideoSource(video) {
    return {
      id: video.id,
      video_id: video.video_id,
      name: video.name,
      description: video.description,
      start_time: video.start_time,
      end_time: video.end_time,
      url: video.url,
      sources: [
        {
          src: this.$sce.trustAsResourceUrl(video.url), type: 'video/mp4'
        }
      ]
    }
  }

  saveClip() {
    let newUrl = this.selectedVideo.url.split('#')[0] + `#t=${this._getTimeInSeconds(this.selectedVideo.start_time)},${this._getTimeInSeconds(this.selectedVideo.end_time)}`;
    this.selectedVideo.url = newUrl;
    this.config.sources = this.getVideoSource(this.selectedVideo).sources;
    this.onVideoUpdated({video: this.selectedVideo});

    this.isEditMode = false;
  }

  cancelEditing(form) {
    form.$rollbackViewValue();
    this.isEditMode = false;
  }
  
  // FIXME: This method should be moved to VideosService
  _getTimeInSeconds(time) {
    let mins = time.substr(0,2);
    let seconds = time.substr(2,3);

    return parseInt(mins) * 60 + parseInt(seconds);
  }
}

VpVideoPlayCtrl.$inject = ['$scope', '$sce'];

let VpVideoPlayComponent = {
  template,
  controller: VpVideoPlayCtrl,
  bindings: {
    selectedVideo: '<',
    onVideoUpdated: '&'
  }
};

export default VpVideoPlayComponent;
