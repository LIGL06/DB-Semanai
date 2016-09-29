var app = angular.module('myApp', ['angularFileUpload']{
  app.controller('MainController', function($scope, $upload) {

    $scope.uploadFile = function(){

      $scope.fileSelected = function(files) {
         if (files && files.length) {
            $scope.file = files[0];
         }
         $upload.upload({
           url: '/api/upload',
         })
         .success(function(data) {
           console.log(data, 'uploaded');
          });
        };
    };
  });
});
