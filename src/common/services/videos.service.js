'use strict';

class VideosService {

  constructor(localStorageService) {
    this.localStorageService = localStorageService;

    // load mock videos
    if (JSON.parse(this.localStorageService.get('videos')) === null) {
      this.loadMockVideos();
    }
  }

  loadMockVideos() {
    let mockVideoData = [
      {
        id: 1,
        name: 'Test Video 1',
        url: 'http://static.videogular.com/assets/videos/videogular.mp4',
        description: 'A sample video for quick test',
        created_at: new Date(),
        protected: true,
        clips: [
          {
            id: 1,
            video_id: 1,
            name: 'Test Clip 1',
            description: 'A Test Clip 1',
            url: 'http://static.videogular.com/assets/videos/videogular.mp4#t=5,15',
            created_at: new Date(),
            start_time: '0005',
            end_time: '0015'
          }
        ]
      }
    ];

    this.localStorageService.set('videos', JSON.stringify(mockVideoData));
  }

  getNextId() {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    return videos[videos.length - 1].id + 1;
  }

  addVideo(video) {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    video.id = this.getNextId();
    videos.push(video);
    this._saveVideos(videos);
  }

  addClip(video, clip) {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    let index = videos.indexOf(video);
    if (index > -1) {
      videos[index].clips.push(clip);
    }

    this._saveVideos(videos);
  }

  getVideos() {
    return JSON.parse(this.localStorageService.get('videos'));
  }

  getVideo(index) {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    return videos[index - 1];
  }

  /*removeAllClips(video) {
    let index = this._videos.indexOf(video);
    if (index > -1) {
      this._videos[index].clips = [];
    }
  }*/

  updateClip(clip) {

    let videoIndex = this._videos.indexOf(video);
    if (videoIndex > -1) {
      for (let key in clip) {
        if (this._videos[videoIndex].clips[index][key]) {
          this._videos[videoIndex].clips[index][key] = clip[key];
        }
      }
    }
  }

  _saveVideos(videos) {
    this.localStorageService.set('videos', JSON.stringify(videos));
  }
}

VideosService.$inject = ['localStorageService'];

export default VideosService;
