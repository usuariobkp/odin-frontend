var app = angular.module('odin.categoryControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

function CategoryListController($scope, $location, rest, $rootScope, $routeParams) {
    $scope.activeCategories = [];
    $scope.activeCategory = $routeParams['categories.name'];
    $scope.activeCategory = $.isArray($scope.activeCategory) ? $scope.activeCategory[0] : $routeParams['categories.name'];
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.statistics = {};
    $scope.porcentual = {};
    $scope.totalStatistics = 0;

    rest().findOne({
      id: $routeParams.id,
      type: "datasets",
      params: "include=categories"
    }, function(dataset) {
      dataset.categories.forEach(category => {
        $scope.activeCategories.push(category.name);
      });
    });

    rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function(categories) {
        $scope.categories = categories;
        $scope.categories = categories.data;
        $scope.showCategories = false;

        $scope.categories.forEach(function(element) {
            $scope.statistics[element.id] = 0;
            $scope.porcentual[element.id] = 0;
        });

        rest().statistics({
            type: "datasets",
            params: "groupBy=category"
        }, function(statistics) {
            for (element in statistics.data) {
                var cat = statistics.data[element];
                $scope.statistics[element] = cat.count.GET;
                $scope.totalStatistics += cat.count.GET;
            }

            for (element in statistics.data) {
                $scope.porcentual[element] = $scope.statistics[element] * 100 / $scope.totalStatistics;;
            }
        });
    });
}
