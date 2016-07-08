angular.module('english')
    .controller('HomeCtrl', [
        '$scope',
        
        'phrases',

        function($scope, phrases){
            $scope.phrases = phrases.phrases;
            $scope.addPhrase = function(){
                if(!$scope.phrase || $scope.phrase === '') { return; }
                $scope.phrases.push({
                    phrase: $scope.phrase,
                    translate: $scope.translate,
                    example: [
                        {body: 'Cool post!', upvotes: 0},
                        {body: 'Great idea but everything is wrong!', upvotes: 0}
                    ],
                    category: $scope.category,
                    upvotes: 0,
                    downvotes: 0
                });

                $scope.phrase = '';
                $scope.translate = '';
                $scope.example = '';



            };

            $scope.incrementUpvotes = function(post) {
                post.upvotes += 1;
            };
            $scope.decrementDownvotes = function(post) {
                post.downvotes -= 1;
            };
        }]);
