'use strict';

import _ from 'lodash';

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
    return videos.length ? videos[videos.length - 1].id + 1 : -1;
  }

  addVideo(video) {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    video.id = this.getNextId();
    videos.push(video);
    
    this._saveVideos(videos);
  }

  addClip(index, clip) {
    let videos = JSON.parse(this.localStorageService.get('videos'));

    if (videos[index - 1].clips.length > 0) {
      clip.id = videos[index - 1].clips[videos[index - 1].clips.length - 1].id + 1;
    } else {
      clip.id = 1;
    }

    clip.video_id = videos[index - 1].id;
    clip.created_at = new Date();
    
    videos[index - 1].clips.push(clip);
    this._saveVideos(videos);
  }

  getVideos() {
    return JSON.parse(this.localStorageService.get('videos'));
  }

  getVideo(index) {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    return videos[index - 1];
  }

  updateClip(index, clip) {
    let videos = JSON.parse(this.localStorageService.get('videos'));
    let originalClipIndex = _.findIndex(videos[index - 1].clips, (originalClip) => originalClip.id === clip.id);
    videos[index - 1].clips[originalClipIndex] = clip;

    this._saveVideos(videos);
  }

  removeClips(index, clipsIds) {
    var videos = JSON.parse(this.localStorageService.get('videos'));

    _.each(clipsIds, (clipId) => {
      var idx = _.findIndex(videos[index - 1].clips, (clip) => clip.id === clipId);
      videos[index - 1].clips.splice(idx, 1);
    });

    this._saveVideos(videos);
  }

  _saveVideos(videos) {
    this.localStorageService.set('videos', JSON.stringify(videos));
  }
}

VideosService.$inject = ['localStorageService'];

export default VideosService;
