angular.module('english')
.controller('ExamplesCtrl', [
    '$scope',
    'Auth',
    'phrases',
    'phrase',
        function($scope, Auth, phrases, phrase) {
            $scope.phrase = phrase;
           $scope.user = Auth.currentUser();
            $scope.addExample = function() {
                if ($scope.body === '') {return;}
                phrases.addExample(phrase.id, {
                    example: {
                    body: $scope.body,
                    author: 'user',
                    downvotes: 0,
                    upvotes: 0
                }
                }).success(function(example) {
                    
                    $scope.phrase.examples.push(example);
                });
                $scope.body = '';
            };

            $scope.editPhrase = function(){
                phrases.editPhrase({
                       phrase: $scope.phrase,
                       translate: $scope.translate
                })
            };

debugger

            $scope.incrementUpvotes = function(example){
                phrases.upvoteExample(phrase, example);
            };
            $scope.decrementDownvotes = function(example){
                phrases.downvoteExample(phrase, example);
            }
        }]);