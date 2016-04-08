import commonModule from '../index';

describe('Services: VideosService', () => {
  'use strict';

  let VideosService, localStorageService;

  beforeEach(window.module(commonModule));

  beforeEach(inject(($injector) => {
    VideosService = $injector.get('VideosService');
    localStorageService = $injector.get('localStorageService');
  }));


  it('should be able to call localStorageService to load list of videos', () => {
    spyOn(JSON, 'parse');
    let spy = spyOn(localStorageService, 'get');
    let videos = VideosService.getVideos();

    expect(spy).toHaveBeenCalledWith('videos');
  });

  it('should be able to get video by index', () => {
    spyOn(localStorageService, 'get').and.returnValue(JSON.stringify([
      {name: 'Test Video 1'},
      {name: 'Test Video 2'}
    ]));
    let video = VideosService.getVideo(2);

    expect(video.name).toBe('Test Video 2');
  });

  xit('should be able to add a new video', () => {
    spyOn(JSON, 'parse');
    spyOn(localStorageService, 'get').and.returnValue(JSON.stringify([
      {id: 1, name: 'Test Video 1'}
    ]));
    let spy = spyOn(localStorageService, 'set');
    
    VideosService.addVideo({name: 'Unit test video'});
    
    expect(spy).toHaveBeenCalled();
  });

  xit('should be able to add a clip to the video', () => {
    let video = {name: 'Unit test video', clips: []};
    // mock videos array
    VideosService._videos = [video];
    expect(VideosService._videos[0].clips.length).toBe(0);

    VideosService.addClip(video, {name: 'Unit test clip'});

    expect(VideosService._videos[0].clips.length).toBe(1);
  });

  xit('should be able to update a clip', () => {
    let video = {name: 'Unit test video', clips: [{name: 'Test Clip'}]};
    let updatedClip = {name: 'Updated Clip'};
    // mock videos array
    VideosService._videos = [video];

    VideosService.updateClip(video, 0, updatedClip);

    expect(VideosService._videos[0].clips[0].name).toBe('Updated Clip');
  });

  xit('should be able to set a next safe id for a new video', () => {
    let video = {name: 'Unit test video', id: 14};
    let updatedClip = {name: 'Updated Clip'};
    // mock videos array
    VideosService._videos = [video];

    expect(VideosService.getNextId()).toBe(15);
  });
});
