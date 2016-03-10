var fileUpload = angular.module('fileUpload', [])

// This directive binds the file model to the scope variable
.directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }])
// The only controller for the client side
// Performs all server requests and exposes data to the browser
.controller('mainController', ['$scope', '$http', function($scope, $http) {
  // Initialize the fileList variable when the page loads
  angular.element(document).ready(function () {
    $scope.getFiles();
  });
  // This function is called on the submit button to post a file to the api route
  $scope.uploadFile = function() {
    var file = $scope.file;

    var fd = new FormData();
    fd.append('file', file);

    $http.post('/api/files', fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    })
    .success(function(response) {
      $scope.fileData = response.content[0].data;
      $scope.getFiles();
    })
    .error(function (err) {
      console.log(err);
    })
  };
  // This function fetches all files from the database using the api
  $scope.getFiles = function () {
    $http.get('/api/files')
      .success(function (response) {
        $scope.fileList = response;
      })
      .error(function (err) {
        console.log(err);
      })
  };
  // This function gets a single file by id using the api
  $scope.getFile = function () {
    $http.get('/api/files/' + $scope.selected._id)
      .success(function (response) {
        $scope.fileData = response.content[0].data;
      })
      .error(function (err) {
        console.log(err);
      })
  }
}]);
