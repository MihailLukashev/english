angular.module('english')
.controller('CategoryCtrl', [
    '$scope',
    '$stateParams',
    'phrases',

    function($scope, $stateParams, phrases){
        $scope.category = $stateParams.category;
        $scope.phrases = phrases.phrases;

        $scope.incrementUpvotes = function(phrase) {

            phrases.upvote(phrase);
        };
        $scope.decrementDownvotes = function(phrase) {
            phrases.downvote(phrase);
        };
    }
]);