'use strict';

import template from './vp-clips-list.html';
import createClipModalTemplate from './modals/create-clip-modal.html';
import './vp-clips-list.css';

class VpClipsListCtrl {

  constructor($rootScope, $stateParams, VideosService, $mdDialog) {
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;
    this.VideosService = VideosService;
    this.$stateParams = $stateParams;

    this.loadVideo();
  }

  selectVideo(video) {
    this.selectedVideo = video;
    this.onSelectedVideo({video});
  }

  createClip($event) {
    this.$mdDialog.show({
      template: createClipModalTemplate,
      parent: angular.element(document.body),
      targetEvent: $event,
      controller: ['$mdDialog', function createClipModalCtrl($mdDialog) {
        var ctrl = this;
        ctrl.clip = {};

        ctrl.cancel = () => {
          $mdDialog.cancel();
        };

        ctrl.save = () => {
          $mdDialog.hide(ctrl.clip);
        };
      }],
      controllerAs: 'ctrl',
      clickOutsideToClose: true
    }).then((clip) => {
        // FIXME: This logic should be in VideosService
        if (this.video.clips.length > 0) {
          clip.id = this.video.clips[this.video.clips.length - 1].id + 1;
        } else {
          clip.id = 1;
        }
      
        clip.video_id = this.video.id;
        clip.created_at = new Date();
        clip.url = this.video.url + `#t=${this._getTimeInSeconds(clip.start_time)},${this._getTimeInSeconds(clip.end_time)}`;
        this.onClipAdded({clip});
        this.video.clips.push(clip);
    });
  }

  loadVideo() {
    this.video = this.VideosService.getVideo(parseInt(this.$stateParams.id, 10));
    // select video by default
    this.selectedVideo = this.video;
  }

  removeAllClips($event) {
    let confirnDialog = this.$mdDialog
      .confirm()
      .title('Remove all clips for this video ?')
      .textContent('All clips will be permanently removed.')
      .targetEvent($event)
      .ok('Remove')
      .cancel('No');

    this.$mdDialog.show(confirnDialog).then(() => {
      this.VideosService.removeAllClips(this.video);
      this.$rootScope.$broadcast('vp-remove-all-clips');
      this.selectedVideoIndex = 0;
    });
  }

  _getTimeInSeconds(time) {
    let mins = time.substr(0,2);
    let seconds = time.substr(2,3);
    
    return parseInt(mins) * 60 + parseInt(seconds);
  }
}

VpClipsListCtrl.$inject = ['$rootScope', '$stateParams', 'VideosService', '$mdDialog'];

let VpClipsListComponent = {
  template,
  controller: VpClipsListCtrl,
  bindings: {
    onSelectedVideo: '&',
    onClipAdded: '&'
  }
};

export default VpClipsListComponent;
