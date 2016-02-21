'use strict';
import template from './vp-toolbar.html';
import addVideoModalTemplate from './modals/add-video-modal.html';
import './vp-toolbar.css';

 class VpToolbarCtrl {

   constructor($mdDialog) {
     this.$mdDialog =$mdDialog;
   }

   addVideo($event) {
     this.$mdDialog.show({
       template: addVideoModalTemplate,
       parent: angular.element(document.body),
       targetEvent: $event,
       controller: ['$mdDialog', function addVideoModalCtrl($mdDialog) {
         var ctrl = this;

         ctrl.cancel  = () => {
           $mdDialog.cancel();
         };

         ctrl.save = () => {
           $mdDialog.hide(ctrl.video);
         };
       }],
       controllerAs: 'ctrl',
       clickOutsideToClose: true
     }).then((video) => {
        console.log('video', video);
     });
   }
 }

VpToolbarCtrl.$inject = ['$mdDialog'];

let VpToolBarComponent = {
  template,
  controller: VpToolbarCtrl
};

export default VpToolBarComponent;
