import mainModule from '../../index';

describe('Component: vp-menu-sidenav', () => {
  'use strict';

  let $q, scope, $compile, $state;

  beforeEach(window.module(mainModule));

  beforeEach(inject(($injector, $rootScope) => {
    scope = $rootScope.$new();
    $q = $injector.get('$q');
    $compile = $injector.get('$compile');
    $state = $injector.get('$state');
  }));


  function renderComponent() {
    let elm = angular.element('<vp-menu-sidenav></vp-menu-sidenav>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be closed by default', () => {
    let component = renderComponent();
    let controller = component.controller('vpMenuSidenav');

    expect(controller.openState).toBe(false);
  });

  it('should be able to navigate to a view state', () => {
    let component = renderComponent();
    let controller = component.controller('vpMenuSidenav');
    let spy = spyOn($state, 'go');

    controller.goTo('test.state');
    expect(spy).toHaveBeenCalled();
  });

  it('should be closed by navigation to a view state', () => {
    let component = renderComponent();
    let controller = component.controller('vpMenuSidenav');
    spyOn($state, 'go');
    controller.openState = true;

    controller.goTo('test.state');

    expect(controller.openState).toBe(false);
  });
});
