import commonModule from '../index';

describe('Services: VideosService', () => {
  'use strict';

  let VideosService;

  beforeEach(window.module(commonModule));

  beforeEach(inject(($injector) => {
    VideosService = $injector.get('VideosService');
  }));


  it('should be able load list of videos', () => {
    let videos = VideosService.getVideos();

    expect(videos.length).toBe(1);
  });

  it('should be able to get video by index', () => {
    let video = VideosService.getVideo(0);

    expect(video.name).toBe('Test Video 1');
  });

  it('should be able to add a new video', () => {
    let videos = VideosService.getVideos();
    expect(videos.length).toBe(1);

    VideosService.addVideo({name: 'Unit test video'});

    expect(videos.length).toBe(2);
    expect(videos[1].name).toBe('Unit test video');
  });

  it('should be able to add a clip to the video', () => {
    let video = {name: 'Unit test video', clips: []};
    // mock videos array
    VideosService._videos = [video];
    expect(VideosService._videos[0].clips.length).toBe(0);

    VideosService.addClip(video, {name: 'Unit test clip'});

    expect(VideosService._videos[0].clips.length).toBe(1);
  });

  it('should be able to update a clip', () => {
    let video = {name: 'Unit test video', clips: [{name: 'Test Clip'}]};
    let updatedClip = {name: 'Updated Clip'};
    // mock videos array
    VideosService._videos = [video];

    VideosService.updateClip(video, 0, updatedClip);

    expect(VideosService._videos[0].clips[0].name).toBe('Updated Clip');
  });

  it('should be able to remove all clips from a video', () => {
    let video = {name: 'Unit test video', clips: [{name: 'Test Clip'}]};
    let updatedClip = {name: 'Updated Clip'};
    // mock videos array
    VideosService._videos = [video];

    expect(VideosService._videos[0].clips.length).toBe(1);

    VideosService.removeAllClips(video);

    expect(VideosService._videos[0].clips.length).toBe(0);
  });

  it('should be able to set a next safe id for a new video', () => {
    let video = {name: 'Unit test video', id: 14};
    let updatedClip = {name: 'Updated Clip'};
    // mock videos array
    VideosService._videos = [video];

    expect(VideosService.getNextId()).toBe(15);
  });
});
