'use strict';

import template from './vp-video-play.html';
import './vp-video-play.css';

class VpVideoPlayCtrl {

  constructor($scope, $sce, VideosService, $stateParams) {
    this.$scope = $scope;
    this.$sce = $sce;
    this.VideosService = VideosService;
    this.$stateParams = $stateParams;
    this.API = {};
    this.videos = [];
  }

  onPlayerReady(API) {
    this.API = API;
  };

  $onInit() {
    this.video = this.VideosService.getVideo(parseInt(this.$stateParams.id, 10));

    if (this.video) {
      // set full video as the first item
      this.videos.push(this.getVideoSource(this.video));
      this.videos = this.videos.concat(this.video.clips.map((clip) => this.getVideoSource(clip)));

      this.config = {
        sources: this.videos[this.selectedVideoIndex].sources,
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
    }


    this.$scope.$watch('$ctrl.selectedVideoIndex', (newVideoIndex) => {
      if (this.API.stop()) {
        this.API.stop();
      }
      this.isEditMode = false;
      this.config.sources = this.videos[newVideoIndex].sources;
    });

    this.$scope.$on('vp-add-new-clip', (e, clip) => {
      this.videos.push(this.getVideoSource(clip));

    });

    this.$scope.$on('vp-remove-all-clips', (e, clip) => this.videos.length = 1);
  }

  getVideoSource(video) {
    return {
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
    let newUrl = this.video.url + `#t=${this.videos[this.selectedVideoIndex].start_time},${this.videos[this.selectedVideoIndex].end_time}`;
    this.videos[this.selectedVideoIndex].url = newUrl;
    this.videos[this.selectedVideoIndex].sources[0].src = this.$sce.trustAsResourceUrl(newUrl);

    this.VideosService.updateClip(this.video, this.selectedVideoIndex - 1, this.videos[this.selectedVideoIndex]);
    this.isEditMode = false;
    console.log('this.videos[this.selectedVideoIndex]', this.videos[this.selectedVideoIndex]);
  }

  cancelEditing(form) {
    form.$rollbackViewValue();
    this.isEditMode = false;
  }
}

VpVideoPlayCtrl.$inject = ['$scope', '$sce', 'VideosService', '$stateParams'];

let VpVideoPlayComponent = {
  template,
  controller: VpVideoPlayCtrl,
  bindings: {
    selectedVideoIndex: '='
  }
};

export default VpVideoPlayComponent;
