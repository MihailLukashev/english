angular.module('english', ['ui.router', 'templates', 'Devise'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        'AuthProvider',
        '$compileProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, AuthProvider, $compileProvider, $locationProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);


            AuthProvider.loginPath('api/users/sign_in.json');
            AuthProvider.resourceName('user');

            AuthProvider.registerPath('api/users.json');
            AuthProvider.resourceName('user');

            AuthProvider.logoutPath('api/users/sign_out.json');
            AuthProvider.logoutMethod('DELETE');



            // AuthProvider.registerPath('users');

            $stateProvider
                .state('create_new', {
                    url: '/phrases/new',
                    templateUrl: 'phrases/_phrasesnew.html',
                    controller: 'PhrasesCtrl'
                })

                .state('phrases_id', {
                    url: '/phrases/{id}',
                    templateUrl: 'phrases/_phrases.html',
                    controller: 'ExamplesCtrl',
                    resolve: {
                        phrase: ['$stateParams', 'phrases', function ($stateParams, phrases){
                            return phrases.get($stateParams.id);
                        }]
                    }
                })
                .state('users', {
                    url: '/users/{username}',
                    templateUrl: 'users/_user.html'
                    // controller: 'UsersCtrl'
                })
                .state('users/phrases', {
                    url: '/users/{username}/phrases',
                    templateUrl: 'users/_userphrases.html',
                    controller: 'UsersCtrl',
                    resolve: {
                        userPhrases: ['$stateParams', 'phrases', function($stateParams, phrases){
                    
                            return phrases.getUserPhrases($stateParams.username);
                        }]
                    }
                })


                .state('phrases', {
                    url: '/phrases',
                    templateUrl: 'home/_home.html',
                    controller: 'PhrasesCtrl',
                    resolve: {
                        phrasePromise: ['phrases', function(phrases){

                            return phrases.getAll();
                        }]
                    }
                })

                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    loginRequired: false,
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            // $state.go('phrases1');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function ($state, Auth) {
                        Auth.currentUser().then(function () {
                            // $state.go('phrases1');
                        })
                    }]
                })
                .state('newest', {
                    url: '/phrases/category/newest',
                    templateUrl: 'phrases/_newest.html',
                    controller: 'PhrasesCtrl',
                    resolve: {
                        phrasePromise: ['phrases', function(phrases){
                            return phrases.getAll();
                        }]
                    }
                })
                .state('category', {
                    url: '/phrases/category/{category}',
                    templateUrl: 'category/_category.html',
                    controller: 'CategoryCtrl',
                    resolve: {
                        categoryPhrases: ['$stateParams', 'phrases', function($stateParams, phrases){
                            return phrases.getCategoryPhrases($stateParams.category);
                        }]
                    }
                });


            // $urlRouterProvider.otherwise('home');
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/");

        }
    ]).run(['$rootScope', function($rootScope) {

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            console.log('error', error);
        })
}]);