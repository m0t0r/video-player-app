'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import ngMdIcons from 'angular-material-icons';
import uiMask from 'angular-ui-mask';
import localStorageModule from 'angular-local-storage';
import videogular from 'videogular';
import videogularControls from 'videogular-controls';
import videogularBuffering from 'videogular-buffering';
import videogularOverlayPlay from 'videogular-overlay-play';
import videogularPoster from 'videogular-poster';

import core from './core';
import common from './common';
import main from './main';
import videos from './videos';

import AppComponent from './app.component';

  angular
    .module('videoPlayerApp', [
      ngAnimate,
      ngAria,
      ngMessages,
      ngMaterial,
      ngSanitize,
      ngMdIcons,
      uiMask,
      localStorageModule,
      videogular,
      videogularControls,
      videogularBuffering,
      videogularOverlayPlay,
      videogularPoster,
      core,
      common,
      main,
      videos
    ])
    .component('app', AppComponent);
