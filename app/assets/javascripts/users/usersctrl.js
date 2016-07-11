angular.module('english')
.controller('UsersCtrl',  [
    '$scope',
    'phrases',
    'userPhrases',


    function($scope, phrases, userPhrases){
        $scope.phrases = userPhrases;

        $scope.incrementUpvotes = function(phrase) {

            phrases.upvote(phrase);
        };
        $scope.decrementDownvotes = function(phrase) {
            phrases.downvote(phrase);
        };
}]);