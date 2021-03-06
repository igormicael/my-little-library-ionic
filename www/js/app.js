// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers'])
angular.module('mll', ['ionic', 'ngCordova', 'mll.controllers', 'mll.services'])

  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/sidebar.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'mainContent': {
            templateUrl: 'templates/home.html',
            controller: 'IndexController'
          }
        }
      })

      .state('app.mybooks', {
        url: '/mybooks',
        cache: false,
        views: {
          'mainContent': {
            templateUrl: 'templates/mybooks.html',
            controller: 'MyBooksController',
            resolve: {
              mybooks: ['myBooksFactory', function (myBooksFactory) {
                return myBooksFactory.query();
              }]
            }
          }
        }
      })

      .state('app.book', {
        url: '/mybooks/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/book.html',
            controller: 'BookController',
            resolve: {
              userBook: ['$stateParams', 'myBooksFactory', function ($stateParams, myBooksFactory) {
                return myBooksFactory.get({
                  id: $stateParams.id
                });
              }]
            }
          }
        }
      })

      .state('app.newbooks', {
        url: '/newbooks',
        views: {
          'mainContent': {
            templateUrl: 'templates/newbooks.html'
          }
        }
      })

      .state('app.search', {
        url: '/search/:filter',
        views: {
          'mainContent': {
            templateUrl: 'templates/search.html',
            controller: 'SearchController',
            resolve: {
              books: ['booksFactory', function (booksFactory) {
                return booksFactory.query();
              }]
            }
          }
        }
      })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
