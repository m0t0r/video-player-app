import videosModule from '../../index';

describe('Component: vp-video-details', () => {
  'use strict';

  let $q, scope, $compile, $state;

  beforeEach(window.module(videosModule));

  beforeEach(inject(($injector, $rootScope) => {
    scope = $rootScope.$new();
    $q = $injector.get('$q');
    $compile = $injector.get('$compile');

    scope.selectedVideo = {name: 'Test selected video'};
  }));


  function renderComponent() {
    let elm = angular.element('<vp-video-details selected-video="selectedVideo"></vp-video-details>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }


  it('should be able to bind selected video', () => {
    let component = renderComponent();
    let controller = component.controller('vpVideoDetails');

    expect(controller.selectedVideo.name).toBe('Test selected video');
  });
});
