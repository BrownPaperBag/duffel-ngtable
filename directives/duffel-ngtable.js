angular.module('duffel.table', [])
  .directive('duffelTable', function() {
    function refreshTable($scope) {
      $scope.items = $scope.resource.query();
    }
    return {
      restrict: 'E',
      template: function() {
        return [
          '<table class="table">',
            '<thead>',
              '<th ng-repeat="header in headers">{{ header.title }}</th>',
            '</thead>',
            '<tbody>',
              '<tr ng-repeat="item in items">',
                '<td ng-repeat="header in headers" ng-switch on="header.template">',
                  '<div ng-switch-when="undefined">',
                    '{{ item[header.property] }}',
                  '</div>',
                  '<div ng-switch-default compile="header.template" />',
                '</td>',
              '</tr>',
            '</tbody>',
          '</table>'].join('')
      },
      scope: {
        resource: '=',
        headers: '='
      },
      transclude: true,
      replace: true,
      link: function($scope, $element, $attrs, $controller) {
        refreshTable($scope);
      }
    }
  });
