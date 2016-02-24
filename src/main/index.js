'use strict';

import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import common from '../common';

import VpToolbarComponent from './components/vp-toolbar/vp-toolbar.component';
import VpMenuSidenavComponent from './components/vp-menu-sidenav/vp-menu-sidenav.component';

const mainModule = angular
  .module('videoPlayerApp.main', [uiRouter, ngMaterial, common])
  .component('vpToolbar', VpToolbarComponent)
  .component('vpMenuSidenav', VpMenuSidenavComponent);

export default mainModule.name;
