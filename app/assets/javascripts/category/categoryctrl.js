angular.module('english')
.controller('CategoryCtrl', [
    '$scope',
    '$stateParams',
    'phrases',
    'categoryPhrases',
    function($scope, $stateParams, phrases, categoryPhrases){
        $scope.category = $stateParams.category;
        $scope.phrases = categoryPhrases;
        debugger
    }
]);