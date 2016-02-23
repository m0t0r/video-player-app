'use strict';

import template from './vp-video-play.html';
import './vp-video-play.css';

class VpVideoPlayCtrl {

  constructor($sce, VideosService) {
    this.$sce = $sce;
    this.API = {};
    // TODO: Load from VideosService
    this.videos = [
      {
        sources: [
          {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'}
        ]
      }
    ];

    this.config = {
      sources: this.videos[0].sources,
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
}

VpVideoPlayCtrl.$inject = ['$sce', 'VideosService'];

let VpVideoPlayComponent = {
  template,
  controller: VpVideoPlayCtrl,
  bindings: {
    selectedVideo: '='
  }
};

export default VpVideoPlayComponent;
