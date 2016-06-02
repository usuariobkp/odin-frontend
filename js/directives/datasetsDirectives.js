(function() {
    var app = angular.module('store-directives-datasets', []);



   app.directive("resultDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/result-datasets.html",
      
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.showDatasets();
                    $scope.results=data;
                }
              });
            },
            controllerAs: "results"
        };
    });

   app.directive("organizationsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/organizations-results.html",
      
            controller: function($scope,rest) {
                $scope.limitorganizations=0;
                $scope.organizations=[];
                $scope.resultOrganizations=[];
                $scope.loadOrganizations=function (limit){
                    $scope.limitorganizations+=limit; 
                     $scope.resultOrganizations= rest().get({
                        type: "organizations" ,params:"sort=name ASC&limit=5&skip="+$scope.limitorganizations
                    },function (){
                        for (var i = 0; i < $scope.resultOrganizations.data.length; i++) {
                            $scope.organizations.push($scope.resultOrganizations.data[i])
                        }
                    console.log($scope.resultOrganizations.data); 
                    }); 
                    
                }
                $scope.loadOrganizations(0);  
            },
            controllerAs: "organizations"
        };
    });

   app.directive("groupsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/groups-results.html",
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getGroups();
                    $scope.groups=data;
                }
              });
            },
            controllerAs: "groups"
        };
    });

    app.directive("tagsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/tags-results.html",
            controller: function($scope,rest) {
              
                $scope.limitTags=0;
                $scope.tags=[];
                $scope.resultTags=[];
                $scope.loadTags=function (limit){
                    $scope.limitTags+=limit; 
                     $scope.resultTags= rest().get({
                        type: "tags" ,params:"sort=name ASC&limit=5&skip="+$scope.limitTags
                    },function (){
                        for (var i = 0; i < $scope.resultTags.data.length; i++) {
                            $scope.tags.push($scope.resultTags.data[i])
                        }
                    console.log($scope.resultTags.data); 
                    }); 
                     
                }
                $scope.loadTags(0);  
            },
            controllerAs: "tags"
        };
    });

    app.directive("formatsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/formats-results.html",
            controller: function($scope,rest) {
                $scope.limitFormats=0;
                $scope.filetypes=[];
                $scope.resultFormats=[];
                $scope.loadFormats=function (limit){
                    $scope.limitFormats+=limit; 
                     $scope.resultFormats= rest().get({
                        type: "filetypes" ,params:"sort=name ASC&limit=5&skip="+$scope.limitFormats
                    },function (){
                        for (var i = 0; i < $scope.resultFormats.data.length; i++) {
                            $scope.filetypes.push($scope.resultFormats.data[i])
                        }
                    console.log($scope.resultFormats.data); 
                    }); 
                    
                }
                $scope.loadFormats(0);  
            },
            controllerAs: "formats"
        };
    });

        app.directive("licencesResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/licences-results.html",
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getFormats();
                    $scope.licences=data;
                }
              });
            },
            controllerAs: "licences"
        };
    });
    app.directive("statusesResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/statuses-results.html",
            controller: function($scope,rest) {
                $scope.limitStatuses=0;
                $scope.statuses=[];
                $scope.resultStatuses=[];
                $scope.loadStatuses=function (limit){
                    $scope.limitStatuses+=limit; 
                    console.log("sort=name ASC&limit=5&skip="+$scope.limitStatuses);
                     $scope.resultStatuses= rest().get({
                        type: "statuses" ,params:"sort=name ASC&limit=5&skip="+$scope.limitStatuses
                    },function (){
                        for (var i = 0; i < $scope.resultStatuses.data.length; i++) {
                            $scope.statuses.push($scope.resultStatuses.data[i])
                        }
                    console.log($scope.resultStatuses.data); 
                    }); 
                    
                }
                $scope.loadStatuses(0);  
              
            },
            controllerAs: "licences"
        };
    });

})();