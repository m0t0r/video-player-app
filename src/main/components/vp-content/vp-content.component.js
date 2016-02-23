'use strict';

import template from './vp-content.html';

class VpContentCtrl {

  constructor($sce, VideosService, $stateParams) {
    if ($stateParams.id) {
      this.selectedVideo = VideosService.getVideo(parseInt($stateParams.id, 10));
    } else {
      this.selectedVideo = VideosService.getSelectedVideo();
    }
    console.log('this.selectedVideo', this.selectedVideo);
    this.$sce = $sce;
    this.API = {};
    this.fullVideoUrl = 'http://static.videogular.com/assets/videos/videogular.mp4';
    
    this.videos = [
      {
        sources: [
          {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'}
        ]
      },
      {
        sources: [
          {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4#t=6,10'), type: 'video/mp4'}
        ]
      },
      {
        sources: [
          {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4#t=15,20'), type: 'video/mp4'}
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

  onPlayerReady(API) {
    this.API = API;
    
    console.log(this.API);
    this.API.totalTime = 7000;
  };

  createClip(startTime, endTime) {
    this.videos.push({
      sources: [
        {src: this.$sce.trustAsResourceUrl(this.fullVideoUrl+`#t=${startTime},${endTime}`), type: 'video/mp4'}
      ]
    });
  }

  setVideo(index) {
    this.API.stop();
    this.config.sources = this.videos[index].sources;
  };
}

VpContentCtrl.$inject = ['$sce', 'VideosService', '$stateParams'];

let VpContentComponent = {
  template,
  controller: VpContentCtrl
};

export default VpContentComponent;
