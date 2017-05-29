angular.module('odin')
.directive("svgFiletypes", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/svg-filetypes.html",
        scope: {
            fileType: '=info',
        },
        controller: function($scope, $filter) {
            $scope.fileType = $filter('searchFiletype')($scope.fileType);
        }
    };
});
