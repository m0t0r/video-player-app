import mainModule from '../../index';

describe('Component: vp-toolbar', () => {
  'use strict';

  let $q, scope, $compile, $mdDialog;

  beforeEach(window.module(mainModule));

  beforeEach(inject(($injector, $rootScope) => {
    scope = $rootScope.$new();
    $q = $injector.get('$q');
    $compile = $injector.get('$compile');
    $mdDialog = $injector.get('$mdDialog');
  }));


  function renderComponent() {
    let elm = angular.element('<vp-toolbar></vp-toolbar>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to toggle sidenav menu', () => {
    let component = renderComponent();
    let controller = component.controller('vpToolbar');
    let spy = spyOn($mdDialog, 'show').and.callThrough();

    controller.addVideo();
    expect(spy).toHaveBeenCalled();
  });
});
