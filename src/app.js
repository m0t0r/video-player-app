'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import ngMdIcons from 'angular-material-icons';
import videogular from 'videogular';
import videogularControls from 'videogular-controls';
import videogularBuffering from 'videogular-buffering';
import videogularOverlayPlay from 'videogular-overlay-play';
import videogularPoster from 'videogular-poster';

import core from './core';

import AppComponent from './app.component';
import VpToolbarComponent from './components/vp-toolbar/vp-toolbar.component';
import VpSidenavComponent from './components/vp-sidenav/vp-sidenav.component';
import VpContentComponent from './components/vp-content/vp-content.component';

  angular
    .module('videoPlayerApp', [
      ngAnimate,
      ngAria,
      ngMessages,
      ngMaterial,
      ngSanitize,
      ngMdIcons,
      videogular,
      videogularControls,
      videogularBuffering,
      videogularOverlayPlay,
      videogularPoster,
      core
    ])
    .component('app', AppComponent)
    .component('vpToolbar', VpToolbarComponent)
    .component('vpSidenav', VpSidenavComponent)
    .component('vpContent', VpContentComponent);
