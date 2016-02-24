'use strict';
import template from './vp-toolbar.html';
import addVideoModalTemplate from './modals/add-video-modal.html';
import './vp-toolbar.css';

 class VpToolbarCtrl {

   constructor($rootScope, $mdSidenav, $mdDialog, VideosService) {
     this.$mdDialog = $mdDialog;
     this.$mdSidenav = $mdSidenav;
     this.VideosService = VideosService;
     this.$rootScope = $rootScope;
   }

   $onInit() {
     this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
        this.hideFab = toState.name !== 'videos.list';
     });
   }

   toggleMenuSidenav() {
     this.$mdSidenav('menu').toggle();
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
       video.clips = [];
       video.protected = false;
       this.VideosService.addVideo(video);
     });
   }
 }

VpToolbarCtrl.$inject = ['$rootScope', '$mdSidenav', '$mdDialog', 'VideosService'];

let VpToolBarComponent = {
  template,
  controller: VpToolbarCtrl
};

export default VpToolBarComponent;
