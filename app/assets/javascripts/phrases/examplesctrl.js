angular.module('english')
.controller('ExamplesCtrl', [
    '$scope',
    'phrases',
    'phrase',
        function($scope, phrases, phrase) {
            $scope.phrase = phrase;

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
                debugger
                phrases.editPhrase({

                       phrase: $scope.phrase,
                       translate: $scope.translate

                })
            };



            $scope.incrementUpvotes = function(example){
                phrases.upvoteExample(phrase, example);
            };
            $scope.decrementDownvotes = function(example){
                phrases.downvoteExample(phrase, example);
            }
        }]);