'use strict';
import template from './vp-toolbar.html';
import addVideoModalTemplate from './modals/add-video-modal.html';
import './vp-toolbar.css';

 class VpToolbarCtrl {

   constructor($rootScope, $mdSidenav, $mdDialog, VideosService, $stateParams) {
     this.$mdDialog = $mdDialog;
     this.$mdSidenav = $mdSidenav;
     this.VideosService = VideosService;
     this.$rootScope = $rootScope;
     this.$stateParams = $stateParams;
   }

   $onInit() {
     this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
        this.hideFab = toState.name !== 'videos.list';

        // naive implementation of breadcrumbs
        if (toState.name === 'videos.clips') {
          this.video = this.VideosService.getVideo(parseInt(this.$stateParams.id, 10));
        } else {
          this.video = null;
        }
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
       
       this.$rootScope.$broadcast('vp-add-video');
     });
   }
 }

VpToolbarCtrl.$inject = ['$rootScope', '$mdSidenav', '$mdDialog', 'VideosService', '$stateParams'];

let VpToolBarComponent = {
  template,
  controller: VpToolbarCtrl
};

export default VpToolBarComponent;
