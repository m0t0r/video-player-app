'use strict';

function VpValidateGreaterThanLinkFn (scope, el, attrs, ngModelCtrl) {
  function validateGreaterThan(value) {
    var valid = (parseInt(value) > parseInt(scope.vpValidateGreaterThan));
    ngModelCtrl.$setValidity('vpGreaterThan', valid);
    return valid ? value : undefined;
  }

  ngModelCtrl.$parsers.push(validateGreaterThan);
  ngModelCtrl.$formatters.push(validateGreaterThan);

  scope.$watch('vpValidateGreaterThan', function (newValue) {
    if (ngModelCtrl.$viewValue) {
      var parsedViewValue = ngModelCtrl.$viewValue.split(':').join('');
      var valid = (parseInt(parsedViewValue) > parseInt(newValue));

      ngModelCtrl.$setValidity('vpGreaterThan', valid);
    }

    ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
  });
}

let VpValidateGreaterThanDirective = () => {
  return {
    restrict: 'A',
    scope: {
      vpValidateGreaterThan: '='
    },
    require: 'ngModel',
    link: VpValidateGreaterThanLinkFn
  }
};

export default VpValidateGreaterThanDirective;
