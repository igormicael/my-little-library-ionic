/**
 * Created by igor on 25/09/2016.
 */

'use strict';

angular.module('mll.services', ['ngResource'])
  .constant("baseURL", "https://my-little-library.herokuapp.com/")


  .factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', 'baseURL', '$ionicPopup', function ($resource, $http, $localStorage, $rootScope, baseURL, $ionicPopup) {

    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;

    authFac.login = function (loginData) {

      $resource(baseURL + 'users/login')
        .save(loginData,
          function (response) {
            storeUserCredentials({username: loginData.username, token: response.token});
            $rootScope.$broadcast('login:Successful');
            console.log('login:Successful');
          },
          function (response) {
            isAuthenticated = false;

            var message = '<div><p>' + response.data.err.message +
              '</p><p>' + response.data.err.name + '</p></div>';

            var alertPopup = $ionicPopup.alert({
              title: '<h4>Login Failed!</h4>',
              template: message
            });

            alertPopup.then(function (res) {
              console.log('Login Failed!');
            });
          }
        )
    };

    authFac.logout = function () {
      $resource(baseURL + "users/logout").get(function (response) {
      });
      destroyUserCredentials();
    };

    authFac.register = function (registerData) {

      $resource(baseURL + "users/register")
        .save(registerData,
          function (response) {
            authFac.login({username: registerData.username, password: registerData.password});

            $rootScope.$broadcast('registration:Successful');
          },
          function (response) {

            var message = '<div><p>' + response.data.err.message +
              '</p><p>' + response.data.err.name + '</p></div>';

            var alertPopup = $ionicPopup.alert({
              title: '<h4>Registration Failed!</h4>',
              template: message
            });

            alertPopup.then(function (res) {
              console.log('Registration Failed!');
            });
          }
        );
    };

    function loadUserCredentials() {
      var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
      if (credentials.username != undefined) {
        useCredentials(credentials);
      }
    }

    function storeUserCredentials(credentials) {
      $localStorage.storeObject(TOKEN_KEY, credentials);
      useCredentials(credentials);
    }

    function useCredentials(credentials) {
      isAuthenticated = true;
      username = credentials.username;
      authToken = credentials.token;

      // Set the token as header for your requests!
      $http.defaults.headers.common['x-access-token'] = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['x-access-token'] = authToken;
      $localStorage.remove(TOKEN_KEY);
    }

    authFac.isAuthenticated = function () {
      return isAuthenticated;
    };

    authFac.getUsername = function () {
      return username;
    };

    authFac.getToken = function () {
      return authToken;
    };

    authFac.facebook = function () {

    };

    loadUserCredentials();

    return authFac;


  }])

  .factory('myBooksFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "mybooks/:id", {id: '@_id'}, {
      'update': {
        method: 'PUT'
      }
    });

  }])

  .factory('booksFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "books/:id", {id: '@_id'}, {
      'update': {
        method: 'PUT'
      }
    });

  }])

  .factory('$localStorage', ['$window', function ($window) {
    return {
      store: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])

;
