'use strict';
import template from './vp-toolbar.html';
import addVideoModalTemplate from './modals/add-video-modal.html';
import './vp-toolbar.css';

 class VpToolbarCtrl {

   constructor($mdDialog, VideosService) {
     this.$mdDialog = $mdDialog;
     this.VideosService = VideosService;
   }

   addVideo($event) {
     this.$mdDialog.show({
       template: addVideoModalTemplate,
       parent: angular.element(document.body),
       targetEvent: $event,
       controller: ['$mdDialog', function addVideoModalCtrl($mdDialog) {
         var ctrl = this;

         ctrl.cancel = () => {
           $mdDialog.cancel();
         };

         ctrl.save = () => {
           $mdDialog.hide(ctrl.video);
         };
       }],
       controllerAs: 'ctrl',
       clickOutsideToClose: true
     }).then((video) => {
       video.created_at = new Date();
       this.VideosService.addVideo(video);
     });
   }
 }

VpToolbarCtrl.$inject = ['$mdDialog', 'VideosService'];

let VpToolBarComponent = {
  template,
  controller: VpToolbarCtrl
};

export default VpToolBarComponent;
