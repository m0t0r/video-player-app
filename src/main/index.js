'use strict';

import angular from 'angular';

import VpToolbarComponent from './components/vp-toolbar/vp-toolbar.component';
import VpMenuSidenavComponent from './components/vp-menu-sidenav/vp-menu-sidenav.component';

const mainModule = angular
  .module('videoPlayerApp.main', [])
  .component('vpToolbar', VpToolbarComponent)
  .component('vpMenuSidenav', VpMenuSidenavComponent)

export default mainModule.name;
