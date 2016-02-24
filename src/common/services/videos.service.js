'use strict';

class VideosService {
  
  constructor() {
    this._videos = [
      {
        id: 0,
        name: 'Test Video 1',
        url: 'http://static.videogular.com/assets/videos/videogular.mp4',
        description: 'A sample video for quick test',
        created_at: new Date(),
        protected: true,
        clips: [
          {
            id: 0,
            name: 'Test Clip 1',
            url: 'http://static.videogular.com/assets/videos/videogular.mp4#t=5,15',
            created_at: new Date()
          }
        ]
      }
    ];
  }

  getNextId() {
    return this._videos[this._videos.length - 1].id + 1;
  }

  addVideo(video) {
    video.id = this.getNextId();
    this._videos.push(video);
  }

  addClip(video, clip) {
    let index = this._videos.indexOf(video);
    if (index > -1) {
      this._videos[index].clips.push(clip);
    }
  }

  getVideos() {
    return this._videos;
  }

  getVideo(index) {
    return this._videos[index];
  }

  removeAllClips(video) {
    let index = this._videos.indexOf(video);
    if (index > -1) {
      this._videos[index].clips = [];
    }
  }
}

export default VideosService;
