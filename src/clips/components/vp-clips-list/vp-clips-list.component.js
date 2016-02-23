'use strict';

import template from './vp-clips-list.html';
import createClipModalTemplate from './modals/create-clip-modal.html';
import './vp-clips-list.css';

class VpClipsListCtrl {

  constructor($stateParams, VideosService, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.video = VideosService.getVideo(parseInt($stateParams.id, 10));
    console.log(this.video);
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
      clip.created_at = new Date();
      console.log('clip', clip);
    });
  }
}

VpClipsListCtrl.$inject = ['$stateParams', 'VideosService', '$mdDialog'];

let VpClipsListComponent = {
  template,
  controller: VpClipsListCtrl,
  bindings: {
    selectedVideo: '='
  }
};

export default VpClipsListComponent;
