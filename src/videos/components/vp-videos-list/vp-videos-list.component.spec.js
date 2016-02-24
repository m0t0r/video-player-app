import videosModule from '../../index';

describe('Component: vp-videos-list', () => {
  'use strict';

  let $q, scope, $compile, $state;

  beforeEach(window.module(videosModule));

  beforeEach(inject(($injector, $rootScope) => {
    scope = $rootScope.$new();
    $q = $injector.get('$q');
    $compile = $injector.get('$compile');

    scope.videos = [
      {name: 'Mock Video'}
    ];

    scope.selectedVideo = {name: 'Mock selected Video'};
  }));


  function renderComponent() {
    let elm = angular.element('<vp-videos-list videos="videos" selected-video="selectedVideo"></vp-videos-list>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to bind videos list', () => {
    let component = renderComponent();
    let controller = component.controller('vpVideosList');

    expect(controller.videos).toBeDefined();
  });

  it('should be able to bind selected video', () => {
    let component = renderComponent();
    let controller = component.controller('vpVideosList');

    expect(controller.selectedVideo).toBeDefined();
  });
});
