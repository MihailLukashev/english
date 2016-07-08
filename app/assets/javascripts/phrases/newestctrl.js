angular.module('english')
    .filter('startFrom', function(){
        return function(input, start){
            start = +start;
            return input.slice(start);
        }
    })
    .controller('NewestCtrl', [
        '$scope',
        '$state',
        'phrases',

        function($scope, $state, phrases) {
            $scope.phrases = phrases.phrases;

            $scope.currentPagen = 0;
            $scope.itemsPerPagen = 10;
            $scope.items = [];

            $scope.firstPage = function() {
                return $scope.currentPagen == 0;
            };
            $scope.lastPage = function() {
                var lastPageNum = Math.ceil($scope.phrases.length / $scope.itemsPerPagen - 1);
                return $scope.currentPagen == lastPageNum;
            };
            $scope.numberOfPages = function(){
                return Math.ceil($scope.phrases.length / $scope.itemsPerPagen);
            };
            $scope.startingItem = function() {
                return $scope.currentPagen * $scope.itemsPerPagen;
            };
            $scope.pageBack = function() {
                $scope.currentPagen = $scope.currentPagen - 1;
            };
            $scope.pageForward = function() {
                $scope.currentPagen = $scope.currentPagen + 1;
            };




            $scope.incrementUpvotes = function(phrase) {
                phrases.upvote(phrase);
            };
            $scope.decrementDownvotes = function(phrase) {
                phrases.downvote(phrase);
            };

        }]);