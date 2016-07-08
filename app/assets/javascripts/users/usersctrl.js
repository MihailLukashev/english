angular.module('english')
.controller('UsersCtrl',  [
    '$scope',
    'phrases',
    'userPhrases',


    function($scope, phrases, userPhrases){
        $scope.phrases = userPhrases;
       
}]);