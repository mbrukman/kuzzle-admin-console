angular.module('kuzzle.indexesDropDownSearch', [])
  .controller('indexesDropDownSearchCtrl', [
    '$scope',
    'indexesApi',
    function ($scope, indexesApi) {
      $scope.isOpen = false;

      $scope.index = indexesApi.get();

      $scope.onPressEnter = function () {
        $scope.isOpen = false;
        $scope.selected = $scope.search;
        $scope.search = '';
        $scope.onClickItem({item: $scope.selected});
      };

    }
  ])
  .directive('indexesDropDownSearch', function () {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        selected: '=',
        createLabel: '@',
        createLink: '@',
        onClickCreate: '&',
        items: '=',
        onClickItem: '&',
        currentItem: '=',
        placeholder: '@'
      },
      controller: 'indexesDropDownSearchCtrl',
      templateUrl: '/javascripts/indexes/indexesDropDownSearch/indexesDropDownSearch.tpl.html'
    };
  });
