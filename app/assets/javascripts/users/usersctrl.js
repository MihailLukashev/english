angular.module('english')
.controller('UsersCtrl',  [
    '$scope',
    '$stateParams',
    'phrases',
    
    function($scope, $stateParams, phrases){
        $scope.phrases = phrases.phrases;
        $scope.username = $stateParams.username;
        $scope.user = phrases.phrases[0].user;
       

        $scope.incrementUpvotes = function(phrase) {

            phrases.upvote(phrase);
        };
        $scope.decrementDownvotes = function(phrase) {
            phrases.downvote(phrase);
        };
}]);