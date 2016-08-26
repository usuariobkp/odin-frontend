var app = angular.module('odin.datasetControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

function DatasetController($scope, $location, rest, $rootScope, $sce, $routeParams, LocationSearchService, $httpParamSerializer, $filter) {
    LocationSearchService.init();
    $scope.activeCategories = [];
    $scope.type = "datasets";
    $scope.params = $.extend({
        name: $filter('unslug')($routeParams.id),
        include: 'tags,categories'
    }, LocationSearchService.searchParams());
    $scope.limit = 10;

    $scope.info = rest().get({
        type: $scope.type,
        params: $httpParamSerializer($scope.params)
    }, function(result) {
        result.data[0].categories.forEach(function(category) {
            $scope.activeCategories.push(category.name);
        });
        $scope.info = $scope.info.data[0];
        $rootScope.header = $scope.info.name;

        var tags = [];

        for (var i = 0; i < $scope.info.tags.length; i++) {
            tags.push({
                name: $scope.info.tags[i].name,
                url: $scope.info.tags[i].id,
                selected: false
            })
        }

        $scope.tags = tags;
        $scope.fileTypes = {};

        $scope.filesResults = rest()[
                $scope.params.query ? 'search' : 'get'
        ]({
            type: 'files',
            params: 'include=tags&dataset=' + $scope.info.id
        }, function(result) {
            $scope.files = $scope.filesResults.data.filter(function(file) {
                //TODO: status filter should be handled in the api
                // with AND condition
                return file.status.name === 'Publicado';
            });
            $scope.files.forEach(function(element) {
                rest().findOne({
                    id: element.type.id,
                    type: 'filetypes'
                }, function(resultFileType) {
                    $scope.fileTypes[element.type.id] = resultFileType.name;
                });

                element.aditional_info = []

                angular.forEach(element.optionals, function(val, key) {
                    element.aditional_info.push({
                        clave: key,
                        valor: val
                    });
                });

                element.resources = rest().resources({
                    id: element.id,
                    type: 'files'
                }, function() {
                    if (!!element.resources.data) {
                        for (maps in element.resources.data.maps) {
                            if (!!element.resources.data.maps[maps]) {
                                element.resources.data.maps[maps].base = rest().findOne({
                                    type: 'basemaps',
                                    id: element.resources.data.maps[maps].basemap
                                }, function() {

                                    element.resources.data.maps[maps].geoData = {
                                        data: element.resources.data.maps[maps].geojson
                                    }
                                    element.resources.data.maps[maps].tile = element.resources.data.maps[maps].base.url;
                                });
                            }
                        }
                    }
                });

                if (element.type.api) {
                    element.contents = rest().contents({
                        id: element.id,
                        type: 'files',
                        params: 'limit=' + $scope.limit
                    });
                }
            });

            $scope.info.additional_info = [];

            angular.forEach($scope.info.optionals, function(val, key) {
                $scope.info.additional_info.push({
                    clave: key,
                    valor: val
                });
            });
        });
    });

    $scope.paging = function(event, page, pageSize, total, resource) {
        var skip = (page - 1) * $scope.limit;
        //$scope.q = "&skip=" + skip + "&limit=" + $scope.limit;
        resource.contents = rest().contents({
            id: resource.id,
            type: 'files',
            params: "skip=" + skip + "&limit=" + $scope.limit
        });
    };

    $scope.toggleDropdown = function(event) {
        if ($(event.target).next().hasClass('dataset-additional-info-table-inactive')) {
            $(event.target).next().addClass('dataset-additional-info-table-active');
            $(event.target).next().removeClass('dataset-additional-info-table-inactive');
            $(event.target).addClass('dataset-additional-info-active');
        } else {
            $(event.target).next().addClass('dataset-additional-info-table-inactive');
            $(event.target).next().removeClass('dataset-additional-info-table-active');
            $(event.target).removeClass('dataset-additional-info-active');
        }
    };

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.disqusConfig = {
        disqus_shortname: 'badataodin',
        disqus_identifier: $routeParams.id,
        disqus_url: $location.absUrl()
    };

    $scope.scroll = 0;
    $scope.loading = 'Cargando..';

    $scope.getNavStyle = function(scroll) {
        if (scroll > 100)
            return 'pdf-controls fixed';
        else
            return 'pdf-controls';
    }

    $scope.onError = function(error) {
        // console.log(error);
    }

    $scope.onLoad = function() {
        $scope.loading = '';
    }

    $scope.onProgress = function(progress) {
        // console.log(progress);
    }
}
