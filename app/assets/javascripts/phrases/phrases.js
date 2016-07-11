angular.module('english')
    .factory('phrases',  [
        '$http',
        function($http){
        var o = {
            phrases: []
            
        };
        o.getAll = function() {
            return $http.get('/api/phrases.json').success(function (data) {
                angular.copy(data, o.phrases);
            });
        };
        o.create = function(phrase) {
            return $http.post('/api/phrases.json', phrase).success(function(data){
                o.phrases.push(data);
            });
        };
        o.upvote = function(phrase) {
            return $http.put('/api/phrases/' + phrase.id + '/uplike.json').success(function(data){
                debugger
                phrase.upvotes += 1;
            });
        };
        o.downvote = function(phrase) {
            return $http.put('/api/phrases/' + phrase.id + '/downlike.json').success(function(data){
                phrase.upvotes -= 1;
            });
        };
        o.get = function(id){
            return $http.get('/api/phrases/' + id + '.json').then(function(res){
                return res.data;
            });
        };


        o.getUserPhrases = function(username){
            return $http.get('/api/users/' + username + '/phrases.json').success(function (res) {
                return res.data;
            });
        };

        o.getCategoryPhrases = function(category){
            return $http.get('/api/phrases/category/' + category + '.json').success(function (data) {

                angular.copy(data, o.phrases);
            });
        };


        o.addExample = function(id, example){
            return $http.post('/api/phrases/' +id + '/examples.json', example);
        };
        o.upvoteExample = function(phrase, example){
            return $http.put('/api/phrases/' + phrase.id + '/examples/' + example.id + '/uplike.json').success(function(data){
                example.upvotes += 1;
            });
        };
        o.downvoteExample = function(phrase, example){
            return $http.put('/api/phrases/' + phrase.id + '/examples/' + example.id + '/downlike.json').success(function(data){
                example.upvotes -= 1;
            });
        };
        return o;
    }]);