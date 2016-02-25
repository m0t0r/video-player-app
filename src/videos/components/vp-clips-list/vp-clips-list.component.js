'use strict';

import template from './vp-clips-list.html';
import createClipModalTemplate from './modals/create-clip-modal.html';
import './vp-clips-list.css';

class VpClipsListCtrl {

  constructor($rootScope, $stateParams, VideosService, $mdDialog) {
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;
    this.VideosService = VideosService;
    this.video = this.VideosService.getVideo(parseInt($stateParams.id, 10));
  }

  selectVideo(index) {
    this.selectedVideoIndex = index;
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
        clip.created_at = new Date(),
        clip.url = this.video.url + `#t=${clip.start_time},${clip.end_time}`;
      this.$rootScope.$broadcast('vp-add-new-clip', clip);
      this.VideosService.addClip(this.video, clip);
    });
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
}

VpClipsListCtrl.$inject = ['$rootScope', '$stateParams', 'VideosService', '$mdDialog'];

let VpClipsListComponent = {
  template,
  controller: VpClipsListCtrl,
  bindings: {
    selectedVideoIndex: '='
  }
};

export default VpClipsListComponent;
