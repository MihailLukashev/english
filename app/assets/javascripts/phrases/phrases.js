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
            
            return $http.put('/api/phrases/' + phrase.id + '/uplike.json', {}).success(function(res){
                // updated phrase
                angular.merge(phrase, res);

            });
        };
        o.downvote = function(phrase) {
            return $http.put('/api/phrases/' + phrase.id + '/downlike.json', {}).success(function(res){
                angular.merge(phrase, res);
            });
        };
        o.get = function(id){
            return $http.get('/api/phrases/' + id + '.json').then(function(res){
                return res.data;
            });
        };


        o.getUserPhrases = function(username){
            return $http.get('/api/users/' + username + '/phrases.json').success(function (data) {
                angular.copy(data, o.phrases);
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
            return $http.put('/api/phrases/' + phrase.id + '/examples/' + example.id + '/uplike.json', {}).success(function(res){
                angular.merge(example, res);

            });
        };
        o.downvoteExample = function(phrase, example){
            return $http.put('/api/phrases/' + phrase.id + '/examples/' + example.id + '/downlike.json', {}).success(function(res){
                angular.merge(example, res);
            });
        };

        o.editPhrase = function(phrase){
            return $http.put('/api/phrases/' + phrase.phrase.id + '.json',{phrase: phrase.phrase}).success(function(res){
                angular.copy(phrase, res);
            });
        };
        return o;
    }]);