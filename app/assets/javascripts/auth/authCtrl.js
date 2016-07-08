angular.module('english')
    .controller('AuthCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){

        $scope.login = function() {
            Auth.login($scope.user).then(function(){
                $state.go('phrases');
            });

        };

        $scope.register = function() {
            Auth.register($scope.user).then(function(){
                $state.go('phrases');
            
            });
        };
    }]);
