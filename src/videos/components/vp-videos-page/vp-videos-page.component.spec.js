import videosModule from '../../index';

describe('Component: vp-videos-page', () => {
  'use strict';

  let $q, scope, $compile, $state;

  beforeEach(window.module(videosModule));

  beforeEach(inject(($injector, $rootScope) => {
    scope = $rootScope.$new();
    $q = $injector.get('$q');
    $compile = $injector.get('$compile');
    $state = $injector.get('$state');
  }));


  function renderComponent() {
    let elm = angular.element('<vp-videos-page></vp-videos-page>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to load videos on init', () => {
    let component = renderComponent();
    let controller = component.controller('vpVideosPage');

    expect(controller.videos).toBeDefined();
  });

  it('should select first available video by default', () => {
    let component = renderComponent();
    let controller = component.controller('vpVideosPage');

    expect(controller.selectedVideo).toBeDefined();
  });
});
