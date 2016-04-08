'use strict';

import template from './vp-clips-list.html';
import createClipModalTemplate from './modals/create-clip-modal.html';
import './vp-clips-list.css';

class VpClipsListCtrl {

  constructor($stateParams, VideosService, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.VideosService = VideosService;
    this.$stateParams = $stateParams;
    this.selectedClipsIdsForDeletion = [];

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

  selectClip(clip) {
    if (clip.selected) {
      this.selectedClipsIdsForDeletion.push(clip.id);
    } else {
      var idx = this.selectedClipsIdsForDeletion.indexOf(clip.id);
      this.selectedClipsIdsForDeletion.splice(idx, 1);
    }
  }
  

  removeAllClips($event) {
    let confirnDialog = this.$mdDialog
      .confirm()
      .title('Remove selected clips for this video ?')
      .textContent('All selected clips will be permanently removed.')
      .targetEvent($event)
      .ok('Remove')
      .cancel('No');

    this.$mdDialog.show(confirnDialog).then(() => {
      this.VideosService.removeClips(parseInt(this.$stateParams.id, 10), this.selectedClipsIdsForDeletion);
      this.loadVideo();
      this.selectedClipsIdsForDeletion.length = 0;
    });
  }

  _getTimeInSeconds(time) {
    let mins = time.substr(0,2);
    let seconds = time.substr(2,3);
    
    return parseInt(mins) * 60 + parseInt(seconds);
  }
}

VpClipsListCtrl.$inject = ['$stateParams', 'VideosService', '$mdDialog'];

let VpClipsListComponent = {
  template,
  controller: VpClipsListCtrl,
  bindings: {
    onSelectedVideo: '&',
    onClipAdded: '&'
  }
};

export default VpClipsListComponent;
