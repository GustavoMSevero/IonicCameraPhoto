angular.module('starter')

.controller('ImageController', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {

	$ionicPlatform.ready(function() {
		$scope.images = FileService.images();
		$scope.$apply();
	});

	$scope.urlForImage = function(imageName) {
		return cordova.file.dataDirectory + imageName;
	};

	$scope.addMedia = function() {
		$scope.hideSheet = $ionicActionSheet.show({
			button: [
				{text: 'Take Photo'},
				{text: 'Photo from library'}
			],
			titleText: 'Add images',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				$scope.addImage(index);
			}
		});
	};

	$scope.addImage = function(type) {
		$scope.hideSheet();
		ImageService.handleMediaDialog(type).then(function() {
			$scope.$apply();
		});
	};
});