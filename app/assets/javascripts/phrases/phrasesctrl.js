angular.module('english')
    .filter('startFrom', function(){
        return function(input, start){
            start = +start;
            return input.slice(start);
        }
    })
.controller('PhrasesCtrl', [
    '$scope',
    '$state',
    'phrases',

    function($scope, $state, phrases){
        $scope.phrases = phrases.phrases;
        
     $scope.addPhrase = function(){
         if(!$scope.phrase || $scope.phrase === '') { return; }

         phrases.create({
            phrase: {
                phrase: $scope.phrase,
                translate: $scope.translate,
                category: $scope.category,
                examples_attributes:[
                    { body: $scope.example }
                ]
            }
        });

        $scope.phrase = '';
            $scope.translate = '';
            $scope.example = '';


         $state.go('phrases');

     };
        
        $scope.currentPage = 0;
        $scope.itemsPerPage = 10;
        $scope.items = [];

        $scope.firstPage = function() {
            return $scope.currentPage == 0;
        };
        $scope.lastPage = function() {
            var lastPageNum = Math.ceil($scope.phrases.length / $scope.itemsPerPage - 1);
            return $scope.currentPage == lastPageNum;
        };
        $scope.numberOfPages = function(){
            return Math.ceil($scope.phrases.length / $scope.itemsPerPage);
        };
        $scope.startingItem = function() {
            return $scope.currentPage * $scope.itemsPerPage;
        };
        $scope.pageBack = function() {
            $scope.currentPage = $scope.currentPage - 1;
        };
        $scope.pageForward = function() {
            $scope.currentPage = $scope.currentPage + 1;
        };


        $scope.incrementUpvotes = function(phrase) {

            phrases.upvote(phrase);
        };
        $scope.decrementDownvotes = function(phrase) {
            phrases.downvote(phrase);
        };
    }]);