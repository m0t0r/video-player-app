'use strict';

class VideosService {
  
  constructor() {
    this._videos = [];
  }
  
  addVideo(video) {
    this._videos.push(video);
    console.log('debug', this.videos);
  }

  getVideos() {
    return this._videos;
  }

  getVideo(index) {
    return this._videos[index];
  }
}

export default VideosService;
