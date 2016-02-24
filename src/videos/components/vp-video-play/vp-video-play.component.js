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
    var video = this.VideosService.getVideo(parseInt(this.$stateParams.id, 10));
    // set full video as the first item
    this.videos.push(this.getVideoSource(video));
    this.videos = this.videos.concat(video.clips.map((clip) => this.getVideoSource(clip)));

    this.$scope.$watch('$ctrl.selectedVideoIndex', (newVideoIndex) => {
      this.API.stop();
      this.config.sources = this.videos[newVideoIndex].sources;
    });

    this.$scope.$on('vp-add-new-clip', (e, clip) => this.videos.push(this.getVideoSource(clip)));

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

  getVideoSource(video) {
    return {
      sources: [
        {
          src: this.$sce.trustAsResourceUrl(video.url), type: 'video/mp4'
        }
      ]
    }
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
