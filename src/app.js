'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import AppComponent from './app.component';
import VpToolbarComponent from './components/vp-toolbar/vp-toolbar.component.js';

  angular
    .module('videoPlayerApp', [
      ngAnimate,
      ngAria,
      ngMessages,
      ngMaterial,
      uiRouter
    ])
    .component('app', AppComponent)
    .component('vpToolbar', VpToolbarComponent);
