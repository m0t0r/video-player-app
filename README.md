# video-player-app

[![Build Status](https://travis-ci.org/m0t0r/video-player-app.svg?branch=master)](https://travis-ci.org/m0t0r/video-player-app)

About
-----
This application represents HTML5 video player which allows users to add videos for watching and create clips from full video.
This project is built with the following main technologies:

```
  - AngularJS 1.5.x
  - Angular Material 1.0.x
```
and is written with ES6 version of JavaScript. The project follows recommended uni-directional data flow for the components.
Local Storage is used for data persistence. 

Installation
------------
You must have `nodejs` (>= 4.x) to be installed before following next commands:

```
npm install
npm start
open in a browser: http://localhost:8080
```
If you don't have `nodejs` on your machine, please install it with [nvm](https://github.com/creationix/nvm) or 
follow installation instructions on the official [nodejs web site](https://nodejs.org). 

Unit tests
------------

Single run:

```
npm test
```

Dev mode:

```
npm run test-dev
```

Progress
--------

Done:

- [x] Ability to add a video
- [x] Ability to add a clip for the video
- [x] Ability to select clips and remove them
- [x] Ability to watch video and clips
- [x] Ability to update clip's attributes
- [x] Show markers on the video player timeline for the full video
- [x] Validation for time inputs
- [x] Data persistence (using Local Storage)

License
-------
MIT.