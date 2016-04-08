'use strict';

import template from './vp-menu-sidenav.html';
import './vp-menu-sidenav.css';

class VpMenuSidenavCtrl {

  constructor($state) {
    this.$state = $state;
  }

  $onInit() {
    this.openState = false;
  }

  goTo(state) {
    this.$state.go(state, {}, {reload: true});
    this.openState = false;
  }
}

VpMenuSidenavCtrl.$inject = ['$state'];

let VpMenuSidenavComponent = {
  template,
  controller: VpMenuSidenavCtrl
};

export default VpMenuSidenavComponent;
