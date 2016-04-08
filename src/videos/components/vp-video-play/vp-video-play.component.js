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
      console.log('newVideo', newVideo);
      if (this.API.stop()) {
        this.API.stop();
      }
      this.isEditMode = false;
      this.config.sources = this.getVideoSource(newVideo).sources;
    });
  }

  getVideoSource(video) {
    return {
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
    let newUrl = this.selectedVideo.url + `#t=${selectedVideo.start_time},${selectedVideo.end_time}`;
    this.videos[this.selectedVideoIndex].url = newUrl;
    this.videos[this.selectedVideoIndex].sources[0].src = this.$sce.trustAsResourceUrl(newUrl);

    this.VideosService.updateClip(this.video, this.selectedVideoIndex - 1, this.videos[this.selectedVideoIndex]);
    this.isEditMode = false;
  }

  cancelEditing(form) {
    form.$rollbackViewValue();
    this.isEditMode = false;
  }
}

VpVideoPlayCtrl.$inject = ['$scope', '$sce'];

let VpVideoPlayComponent = {
  template,
  controller: VpVideoPlayCtrl,
  bindings: {
    selectedVideo: '<',
    onVideoUpdate: '&'
  }
};

export default VpVideoPlayComponent;
